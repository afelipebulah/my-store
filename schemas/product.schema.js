const Joi = require('joi');

const id = Joi.number().integer().positive();
const name = Joi.string().min(3).max(30);
const description = Joi.string().min(3).max(70);
const price = Joi.number().integer().positive().min(100).max(999);
const image = Joi.string().uri();

const categoryId = Joi.number().integer().positive();

const size = Joi.number().integer().positive().min(1).max(100);

const limit = Joi.number().integer().positive().min(1).max(100);
const offset = Joi.number().integer().min(0);

const price_min = Joi.number().integer().positive().min(100);
const price_max = Joi.number().integer().positive().max(999);

const createProductSchema = Joi.object({
    name: name.required(),
    description: description.required(),
    price: price.required(),
    image: image,
    categoryId: categoryId.required()
});

const updatePartialProductSchema = Joi.object({
    name: name,
    description: description,
    price: price,
    image: image,
    categoryId: categoryId
});

const updateProductSchema = Joi.object({
    name: name.required(),
    description: description.required(),
    price: price.required(),
    image: image.required(),
    categoryId: categoryId.required()
});

const getProductSchema = Joi.object({
    id: id.required()
});

const getListProductSchema = Joi.object({
    limit: limit,
    offset: offset,
    price: price,
    price_min: price_min,
    price_max: price_max.when('price_min', {
        is: price_min.required(),
        then: Joi.required()
    })
});

const generateProductSchema = Joi.object({
    size: size
});

module.exports = { 
    createProductSchema,
    updatePartialProductSchema,
    updateProductSchema,
    getProductSchema,
    getListProductSchema,
    generateProductSchema
}