class PersonaServices {

    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    getIdentificacion() {
        return this.id;
    }

    getNombre() {
        return this.nombre;
    }
}

module.exports = PersonaServices;