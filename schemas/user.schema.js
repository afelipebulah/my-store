const Joi = require('joi');

const id = Joi.number().integer().positive();
const email = Joi.string().min(5).max(50);
const password = Joi.string().min(5).max(50);
const role = Joi.string().min(5).max(50);

const size = Joi.number().integer().positive().min(1).max(100);

const createUserSchema = Joi.object({
    email: email.required(),
    password: password.required(),
    role: role.required()
});

const updatePartialUserSchema = Joi.object({
    email: email,
    password: password,
    role: role
});

const updateUserSchema = Joi.object({
    email: email.required(),
    password: password.required(),
    role: role
});

const getUserSchema = Joi.object({
    id: id.required()
});

const getListUserSchema = Joi.object({
    size: size
});

const generateUserSchema = Joi.object({
    size: size
});

module.exports = { 
    createUserSchema,
    updatePartialUserSchema,
    updateUserSchema,
    getUserSchema,
    getListUserSchema,
    generateUserSchema
}