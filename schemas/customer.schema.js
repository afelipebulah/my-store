const Joi = require('joi');
const { createUserSchema } = require('./user.schema');

const id = Joi.number().integer().positive();
const name = Joi.string().min(3).max(50);
const lastName = Joi.string().min(3).max(50);
const phone = Joi.string().min(10).max(20);
const userId = Joi.number().integer().positive();

const email = Joi.string().min(5).max(50);
const password = Joi.string().min(5).max(50);
const role = Joi.string().min(5).max(50);

const size = Joi.number().integer().positive().min(1).max(100);

const createCustomerSchema = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    phone: phone,
    user: createUserSchema
});

const updatePartialCustomerSchema = Joi.object({
    name: name,
    lastName: lastName,
    phone: phone,
    userId: userId
});

const updateCustomerSchema = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    phone: phone,
    userId: userId
});

const getCustomerSchema = Joi.object({
    id: id.required()
});

const getListCustomerSchema = Joi.object({
    size: size
});

const generateCustomerSchema = Joi.object({
    size: size
});

module.exports = { 
    createCustomerSchema,
    updatePartialCustomerSchema,
    updateCustomerSchema,
    getCustomerSchema,
    getListCustomerSchema,
    generateCustomerSchema
}