const { faker } = require('@faker-js/faker');
const { models } = require('../libs/sequelize');
const { NOW } = require('sequelize');
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
      
        await this.products.truncate();

        for (let i = 1; i <= limit; i++) {
            await this.products.create({
            name : faker.commerce.productName(),
            description: faker.random.words(3),
            price : faker.commerce.price(100, 999, 0),
            image : faker.image.imageUrl()
          });
        }
        const data = await this.products.findAll();

        return data;
    }

    async getListProducts(size){
        const data = await this.products.findAll({ include: ['category'] });
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
}

module.exports = ProductsService;