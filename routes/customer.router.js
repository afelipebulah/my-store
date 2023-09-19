const express = require('express');

const validatorHandler = require('../middlewares/validator.handler');
const { 
  createCustomerSchema,
  updatePartialCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
  getListCustomerSchema,
  generateCustomerSchema
} = require('../schemas/customer.schema');

const CustomerService = require('../services/customer.services');

const service = new CustomerService();

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    "route": "/customers",
    "version": "v0.0.1"
  });
});

router.get('/generate',
  validatorHandler(generateCustomerSchema, 'query'),
  async (req, res, next) => {
    const { size } = req.query;
    let customers;
    try {
      customers = await service.generate(size);
      res.status(200).json(customers);
    } catch (error) {
      next(error);
    }    
  });

router.get('/list',
  validatorHandler(getListCustomerSchema, 'query'),
  async (req, res, next) => {
    const { size } = req.query;
    try {
      const customers = await service.getListCustomers(size);
      res.status(200).json(customers);
    } catch (error) {
      next(error);
    } 
  });

router.get('/search/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await service.searchCustomer(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  });

router.post('/create',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newCustomer = await service.createCustomer(body);
      res.status(201).json({
        message: `cliente creado`,
        data: newCustomer
      });
    } catch (error) {
      next(error);
    }
  })

router.patch('/update/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updatePartialCustomerSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    try {
      const customerUpdated = await service.updateCustomer(body, id);
      res.json({
        id,
        message: 'cliente actualizado',
        data: customerUpdated
      });
    } catch (error) {
      next(error);
    }
  })

router.put('/update/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    try {
      const customerUpdated = await service.updateCustomer(body, id);
      res.json({
        id,
        message: 'cliente actualizado',
        data: customerUpdated
      });
    } catch (error) {
      next(error);
    }
  })

router.delete('/delete/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const customerDeleted = await service.searchCustomer(id);
      await service.deleteCustomer(id);
      res.status(200).json({
        message: 'cliente eliminado',
        data: customerDeleted
      });
    } catch (error) {
      next(error);
    }
  })

module.exports = router;