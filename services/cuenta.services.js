class CuentaServices {

    constructor(){
        this.codigo;
        this.nombre;
        this.saldo;
    }

    setCuenta(codigo, nombre, saldo){
        this.codigo = codigo;
        this.nombre = nombre;
        this.saldo = saldo;

        return this;
    }

    getCodigo(){
        return this.codigo;
    }

    getNombre(){
        return this.nombre;
    }

    getSaldo(){
        return this.saldo;
    }

    addSaldo(delta){
        this.saldo = this.saldo + delta;
    }

}

module.exports = CuentaServices;