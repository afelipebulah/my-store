const express = require('express');
const apiRouter = require('./api.router');
const productsRouter = require('./products.router');
const cuentaRouter = require('./cuenta.router');
const clienteRouter = require('./cliente.router');

function routerApi(app) {
    const router = express.Router();
    //Se define la ruta por defecto del api, en este caso /api
    app.use('/api', router, apiRouter);

    router.use('/products', productsRouter);
    router.use('/cuenta', cuentaRouter);
    router.use('/cliente', clienteRouter);
}

module.exports = routerApi;