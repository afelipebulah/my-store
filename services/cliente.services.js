const CuentaService = require('./cuenta.services');
const PersonaService = require('./persona.services');

class ClienteServices extends PersonaService {

    constructor() {
        super();
        this.correo;
        this.cuenta;
    }

    setCliente(id, nombre, correo, cuenta) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.cuenta = cuenta;

        return this;
    }

    getCorreo() {
        return this.correo;
    }

    getCuenta() {
        return this.cuenta;
    }
}

module.exports = ClienteServices;