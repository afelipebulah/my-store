const express = require('express');
const CuentaService = require('./../services/cuenta.services');

const router = express.Router();
const cuenta = new CuentaService();

cuenta.setCuenta(123,'cuenta de prueba',50000);

router.get('/', (req, res) => {
  res.send(cuenta);
});

module.exports = router;