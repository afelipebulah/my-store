const { faker } = require('@faker-js/faker');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

const default_size = 5;
const max_size = 100;

class UserService {

    constructor(){
        this.users = models.User;       
    }

    async generate(size){
        let limit = size || default_size;
        if(size > max_size) limit = max_size;

        let data = await this.users.findAll();

        if(data.length === 0){
            for (let i = 1; i <= limit; i++) {
                await this.users.create({
                email : faker.internet.email(),
                password : faker.internet.password(),
                role : 'customer'
              });
            }
        }else{
            return data;
        }  
        
        data = await this.users.findAll();

        return data;
    }

    async getListUsers(size){
        const data = await this.users.findAll();
        return data;
    }

    async searchUser(id){
        const data = await this.users.findByPk(id);
        if (data.length == 0){
            throw boom.notFound('Usuario no encontrado');
        }
        return data[0];
    }

    async createUser(body){        
        const newUser = await this.users.create(body);
        
        return newUser;
    }

    async updateUser(body,id){
        const User = await this.searchUser(id);
        const updatedUser = await User.update(body);

        return updatedUser;
    }

    async deleteUser(id){
        const User = await this.searchUser(id);
        const deletedUser = await User.destroy();

        return deletedUser;
    }
    
}

module.exports = UserService;