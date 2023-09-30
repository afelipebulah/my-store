const express = require('express');
const usersRouter = require('./user.router');
const customersRouter = require('./customer.router');
const categoriesRouter = require('./category.router');
const productsRouter = require('./products.router');
const ordersRouter = require('./order.router');
const clienteRouter = require('./cliente.router');
const authRouter = require('./auth.router');

function routerApi(app) {
    const router = express.Router();
    //Se define la ruta por defecto del api, en este caso /
    app.use('/', router);

    router.use('/products', productsRouter);
    router.use('/categories', categoriesRouter);
    router.use('/users', usersRouter);   
    router.use('/orders', ordersRouter);
    router.use('/customers', customersRouter);
    router.use('/auth', authRouter);

    router.use('/cliente', clienteRouter);
}

module.exports = routerApi;