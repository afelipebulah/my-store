const express = require('express');
const productsRouter = require('./products.router');
const clienteRouter = require('./cliente.router');

function routerApi(app) {
    const router = express.Router();
    //Se define la ruta por defecto del api, en este caso /api
    app.use('/api', router);

    router.use('/products', productsRouter);
    router.use('/cliente', clienteRouter);
}

module.exports = routerApi;