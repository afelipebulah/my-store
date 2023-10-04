const express = require('express');
const passport = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');
const validatorHandler = require('./../middlewares/validator.handler');
const { createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
  getListCategorySchema,
  generateCategorySchema } = require('../schemas/category.schema');

const CategoryService = require('../services/category.services');

const service = new CategoryService();

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    "route": "/categories"
  });
});

router.get('/generate',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(generateCategorySchema, 'query'),
  async (req, res, next) => {
    const { size } = req.query;
    let categories;
    try {
      categories = await service.generate(size);
    } catch (error) {
      next(error);
    }
    res.status(200).json(categories);
  });

router.get('/list',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  validatorHandler(getListCategorySchema, 'query'),
  async (req, res, next) => {
    const { size } = req.query;
    try {
      const categories = await service.getList(size);
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  });

router.get('/search/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const category = await service.search(id);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  });

router.post('/create',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newObject = await service.create(body);
      res.status(201).json({
        message: `categoria creada`,
        data: newObject
      });
    } catch (error) {
      next(error);
    }
  })

router.patch('/update/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    try {
      const objectUpdated = await service.update(body, id);
      res.json({
        id,
        message: 'categoria actualizada',
        data: objectUpdated
      });
    } catch (error) {
      next(error);
    }
  })

router.put('/update/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    try {
      const objectUpdated = await service.update(body, id);
      res.json({
        id,
        message: 'categoria actualizada',
        data: objectUpdated
      });
    } catch (error) {
      next(error);
    }
  })

router.delete('/delete/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const objectDeleted = await service.search(id);
      await service.delete(id);
      res.status(200).json({
        message: 'categoria eliminada',
        data: objectDeleted
      });
    } catch (error) {
      next(error);
    }
  })

module.exports = router;