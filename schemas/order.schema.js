const Joi = require('joi');

const id = Joi.number().integer().positive();

const customerId = Joi.number().integer().positive();

const size = Joi.number().integer().positive().min(1).max(100);

const createOrderSchema = Joi.object({
    customerId: customerId.required()
});

const updateOrderSchema = Joi.object({
    customerId: customerId
});

const getOrderSchema = Joi.object({
    id: id.required()
});

const getListOrderSchema = Joi.object({
    size: size
});

const generateOrderSchema = Joi.object({
    size: size
});

module.exports = { 
    createOrderSchema,
    updateOrderSchema,
    getOrderSchema,
    getListOrderSchema,
    generateOrderSchema
}