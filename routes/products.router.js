const express = require('express');

const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updatePartialProductSchema, updateProductSchema, getProductSchema, getListProductSchema, generateProductSchema } = require('./../schemas/product.schema');
const ProductsService = require('./../services/product.services');

const service = new ProductsService();

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    "route": "/products",
    "version": "v0.0.1"
  });
});

router.get('/generate',
  validatorHandler(generateProductSchema, 'query'),
  async (req, res) => {
    const { size } = req.query;
    const products = await service.generate(size);
    res.status(200).json(products);
  });

router.get('/list',
  validatorHandler(getListProductSchema, 'query'),
  async (req, res, next) => {
    const { size } = req.query;
    try {
      const products = await service.getListProducts(size);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  });

router.get('/search/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const product = await service.searchProduct(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  });

router.post('/create',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    const id = body.id;
    try {
      const newProduct = await service.createProduct(body);
      res.status(201).json({
        id,
        message: `producto creado`,
        data: newProduct
      });
    } catch (error) {
      next(error);
    }
  })

router.patch('/update/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    try {
      const productUpdated = await service.updatePartialProduct(body, id);
      res.json({
        id,
        message: 'producto actualizado',
        data: productUpdated
      });
    } catch (error) {
      next(error);
    }
  })

router.put('/update/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updatePartialProductSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    try {
      const productUpdated = await service.updateProduct(body, id);
      res.json({
        id,
        message: 'producto actualizado',
        data: productUpdated
      });
    } catch (error) {
      next(error);
    }
  })

router.delete('/delete/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const productDeleted = await service.deleteProduct(id);
      res.status(200).json({
        message: 'producto eliminado',
        data: productDeleted
      });
    } catch (error) {
      next(error);
    }
  })

module.exports = router;