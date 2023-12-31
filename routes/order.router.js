const express = require('express');
const passport = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
  getListOrderSchema,
  generateOrderSchema,
  addItemSchema
} = require('../schemas/order.schema');
const OrderServices = require('../services/order.services');

const service = new OrderServices();

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    "route": "/orders"
  });
});

router.get('/generate',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(generateOrderSchema, 'query'),
  async (req, res, next) => {
    const { size } = req.query;
    let orders;
    try {
      orders = await service.generate(size);
    } catch (error) {
      next(error);
    }
    res.status(200).json(orders);
  });

router.get('/list',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  validatorHandler(getListOrderSchema, 'query'),
  async (req, res, next) => {
    const { size } = req.query;
    try {
      const orders = await service.getList(size);
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  });

router.get('/search/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const order = await service.search(id);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  });

router.post('/create',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newObject = await service.create(body);
      res.status(201).json({
        message: `orden de compra creada`,
        data: newObject
      });
    } catch (error) {
      next(error);
    }
  })

router.post('/add-item',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newObject = await service.addItem(body);
      res.status(201).json({
        message: `item agregado`,
        data: newObject
      });
    } catch (error) {
      next(error);
    }
  })

router.patch('/update/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    try {
      const objectUpdated = await service.update(body, id);
      res.json({
        id,
        message: 'orden de compra actualizada',
        data: objectUpdated
      });
    } catch (error) {
      next(error);
    }
  })

router.put('/update/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    try {
      const objectUpdated = await service.update(body, id);
      res.json({
        id,
        message: 'orden de compra actualizada',
        data: objectUpdated
      });
    } catch (error) {
      next(error);
    }
  })

router.delete('/delete/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const objectDeleted = await service.search(id);
      await service.delete(id);
      res.status(200).json({
        message: 'orden de compra eliminada',
        data: objectDeleted
      });
    } catch (error) {
      next(error);
    }
  })

module.exports = router;