const Joi = require('joi');

const id = Joi.number().integer();
const nombre = Joi.string().min(3).max(30);
const precio = Joi.number().integer().positive().min(100).max(999);
const imagen = Joi.string().uri();
const size = Joi.number().integer().positive().min(1).max(100);

const createProductSchema = Joi.object({
    id: id.required(),
    nombre: nombre.required(),
    precio: precio.required(),
    imagen: imagen
});

const updatePartialProductSchema = Joi.object({
    nombre: nombre,
    precio: precio,
    imagen: imagen
});

const updateProductSchema = Joi.object({
    nombre: nombre.required(),
    precio: precio.required(),
    imagen: imagen.required()
});

const getProductSchema = Joi.object({
    id: id.required()
});

const getListProductSchema = Joi.object({
    size: size
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