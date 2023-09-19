const { faker } = require('@faker-js/faker');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

const default_size = 5;
const max_size = 100;

class OrderServices {

    constructor(){
        this.orders = models.Order;     
    }

    async generate(size){
        let limit = size || default_size;
        if(size > max_size) limit = max_size;

        let data = await this.orders.findAll();

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
        
        data = await this.orders.findAll();

        return data;
    }

    async getList(size){
        const data = await this.orders.findAll({
            include: ['customer']
        });
        return data;
    }

    async search(id){
        const data = await this.orders.findByPk(id, {
            include: [
                {
                    association: 'customer',
                    include: ['user']
                }
            ]
        });
        if (!data){
            throw boom.notFound('Orden de compra no encontrada');
        }
        return data;
    }

    async create(body){        
        const newObject = await this.orders.create(body);
        
        return newObject;
    }

    async update(body,id){
        const object = await this.search(id);
        const updatedObject = await object.update(body);

        return updatedObject;
    }

    async delete(id){
        const object = await this.search(id);
        const deletedObject = await object.destroy();

        return deletedObject;
    }
    
}

module.exports = OrderServices;