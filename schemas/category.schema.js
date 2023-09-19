const Joi = require('joi');

const id = Joi.number().integer().positive();
const name = Joi.string().min(3).max(30);
const image = Joi.string().uri();

const size = Joi.number().integer().positive().min(1).max(100);

const createCategorySchema = Joi.object({
    name: name.required(),
    image: image
});

const updateCategorySchema = Joi.object({
    name: name,
    image: image
});

const getCategorySchema = Joi.object({
    id: id.required()
});

const getListCategorySchema = Joi.object({
    size: size
});

const generateCategorySchema = Joi.object({
    size: size
});

module.exports = { 
    createCategorySchema,
    updateCategorySchema,
    getCategorySchema,
    getListCategorySchema,
    generateCategorySchema
}