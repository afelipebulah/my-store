const Joi = require('joi');

const id = Joi.number().integer().positive();

const customerId = Joi.number().integer().positive();
const orderId = Joi.number().integer().positive();
const productId = Joi.number().integer().positive();
const amount = Joi.number().integer().positive().min(1);

const size = Joi.number().integer().positive().min(1).max(100);

const getOrderSchema = Joi.object({
    id: id.required()
});

const createOrderSchema = Joi.object({
    customerId: customerId.required()
});

const addItemSchema = Joi.object({
    orderId: orderId.required(),
    productId: productId.required(),
    amount: amount.required()
})

const updateOrderSchema = Joi.object({
    customerId: customerId
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
    generateOrderSchema,
    addItemSchema
}