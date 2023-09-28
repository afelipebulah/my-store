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

        let data = await this.users.findAll({
            attributes: { exclude: ['password'] }
          });

        if(data.length === 0){
            for (let i = 1; i <= limit; i++) {
                const emailRandom = faker.internet.email();
                const passRandom = faker.internet.password();
                console.log(`emailRandom: ${emailRandom}, passRandom: ${passRandom}`);

                await this.users.create({
                email : emailRandom,
                password : passRandom,
                role : 'customer'
              });
            }
        }else{
            return data;
        }  
        
        data = await this.users.findAll({
            attributes: { exclude: ['password'] }
          });

        return data;
    }

    async getListUsers(size){
        const data = await this.users.findAll({
            attributes: { exclude: ['password'] }
          });
        return data;
    }

    async searchUser(id){
        const data = await this.users.findByPk(id,{
            attributes: { exclude: ['password'] }
          });
        if (!data){
            throw boom.notFound('Usuario no encontrado');
        }
        return data;
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