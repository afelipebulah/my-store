const express = require('express');
const ClienteServices = require('../services/cliente.services');
const CuentaServices = require('../services/cuenta.services');

const router = express.Router();

const cuenta = new CuentaServices()
.setCuenta(1011,'cuenta de prueba',50000);

const cliente = new ClienteServices()
.setCliente(1152,'Felipe Bula','afelipebulah@gmail.com',cuenta);

router.get('/', (req, res) => {
  res.send(cliente);
});

module.exports = router;