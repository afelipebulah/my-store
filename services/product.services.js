const { faker } = require('@faker-js/faker');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');

const default_size = 5;
const max_size = 100;

class ProductsService {

    constructor(){
        this.products = models.Product;       
    }

    async generate(size){
        let limit = size || default_size;
        if(size > max_size) limit = max_size;
      
        let produdcts = await models.Product.findAll();

        let randomCategory;

        if(produdcts.length == 0){
            for (let i = 1; i <= limit; i++) {
                randomCategory = await this.getRandomCategory();

                await this.createProduct({
                name : faker.random.words(3),
                description: faker.random.words(5),
                price : faker.commerce.price(100, 999, 0),
                image : faker.image.imageUrl(),
                categoryId: randomCategory.id
              });
            }
        } else {
            return produdcts;
        }
        
        produdcts = await models.Product.findAll();

        return produdcts;
    }

    async getListProducts(query){
        const options = {
            include: ['category'],
            order: [['id','asc']],
            where: {}
        };

        const { limit, offset, price, price_min, price_max } = query;

        if(limit && offset){
            options.limit = limit;
            options.offset = offset;
        }

        if(price){
            options.where.price = price;
        }

        if(price_min && price_max) {
            options.where.price = {
                [Op.gte]: price_min,
                [Op.lte]: price_max
            }
        }

        const data = await this.products.findAll(options);

        return data;
    }

    async searchProduct(id){
        const data = await this.products.findByPk(id, { include: ['category'] });
        if (!data){
            throw boom.notFound('producto no encontrado');
        }
        return data;
    }

    async createProduct(body){        
        const newProduct = await this.products.create(body);
        
        return newProduct;
    }

    async updateProduct(body,id){
        const product = await this.searchProduct(id);
        const updatedProduct = await product.update(body);
        return updatedProduct
    }

    async deleteProduct(id){
        const product = await this.searchProduct(id);
        const deletedProduct = await product.destroy();
        return deletedProduct;
    }

    async getRandomCategory () {
        const categories = await models.Category.findAll();
        let randomCategory;

        if(categories.length > 0){
            const randomIndex = Math.floor(Math.random() * categories.length);
            randomCategory = categories[randomIndex];

            return randomCategory;

        } else {
            randomCategory = await models.Category.create({
                name : faker.random.words(3),
                image : faker.image.imageUrl()
            });

            return randomCategory;
        }
    }
}

module.exports = ProductsService;