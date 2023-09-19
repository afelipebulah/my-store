const { faker } = require('@faker-js/faker');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

const default_size = 5;
const max_size = 100;

class CategoryServices {

    constructor(){
        this.categories = models.Category;       
    }

    async generate(size){
        let limit = size || default_size;
        if(size > max_size) limit = max_size;

        let data = await this.categories.findAll();

        if(data.length === 0){
            for (let i = 1; i <= limit; i++) {
                await this.create({
                name : faker.random.words(3),
                image : faker.image.imageUrl()
              });
            }
        }else{
            return data;
        }  
        
        data = await this.categories.findAll();

        return data;
    }

    async getList(size){
        const data = await this.categories.findAll();
        return data;
    }

    async search(id){
        const data = await this.categories.findByPk(id, { include: ['products'] });
        if (!data){
            throw boom.notFound('Categoria no encontrada');
        }
        return data;
    }

    async create(body){        
        const newObject = await this.categories.create(body);
        
        return newObject;
    }

    async update(body,id){
        const object = await this.search(id);
        if (!object){
            throw boom.notFound('Categoria no encontrada');
        }

        const updatedObject = await object.update(body);

        return updatedObject;
    }

    async delete(id){
        const object = await this.search(id);
        if (!object){
            throw boom.notFound('Categoria no encontrada');
        }

        const deletedObject = await object.destroy();

        return deletedObject;
    }
    
}

module.exports = CategoryServices;