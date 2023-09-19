const { faker } = require('@faker-js/faker');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

const default_size = 5;
const max_size = 100;

class CustomerService {

    constructor() {
        this.customers = models.Customer;
    }

    async generate(size) {
        let limit = size || default_size;
        if (size > max_size) limit = max_size;

        let data = await this.getListCustomers();

        if (data.length == 0) {
            for (let i = 1; i <= limit; i++) {
                await this.createCustomer({
                    name: faker.name.firstName(),
                    lastName: faker.name.lastName(),
                    phone: faker.phone.number('+57 32# ### ## ##'),
                    user: {
                        email: faker.internet.email(),
                        password: faker.internet.password(),
                        role: 'customer'
                    }
                });
            }
        } else {
            return data;
        }

        data = await this.getListCustomers();

        return data;
    }

    async getListCustomers(size) {
        const data = await this.customers.findAll();
        return data;
    }

    async searchCustomer(id) {
        const data = await this.customers.findByPk( id, { include: ['user', 'orders'] } );
        if (!data) {
            throw boom.notFound('Cliente no encontrado');
        }

        return data;
    }

    async createCustomer(body) {
        const newCustomer = await this.customers.create( body,  { include: ['user'] } );

        return newCustomer;
    }

    async updateCustomer(body, id) {
        const Customer = await this.searchCustomer(id);
        const updatedCustomer = await Customer.update(body);

        return updatedCustomer;
    }

    async deleteCustomer(id) {
        const Customer = await this.searchCustomer(id);
        const deletedCustomer = await Customer.destroy();

        //eliminar el usuario que está relacionado con el cliente a eliminar
        //pendiente indagar sobre manera de eliminación en cascada
        //const deletedUserReference = await models.User.findAll({ where: { id: Customer.userId } });
        const deletedUserReference = await models.User.findByPk(Customer.userId);
        deletedUserReference.destroy();

        return deletedCustomer;
    }

}

module.exports = CustomerService;