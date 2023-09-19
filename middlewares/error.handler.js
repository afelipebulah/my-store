const fs = require('fs');
const { ValidationError } = require('sequelize');

function logErrors (err, req, res, next){
    const fecha = new Date();
    const dataError = fecha + ' - ' + err.message + '\n' + err.stack + '\n';
    fs.appendFile('logsErrores.txt', dataError , (error) => {
        if(error){
            console.log('falló la escritura de log en archivo');
        }
        next(err);
    });    
}

function errorHandler (err, req, res, next){
    res.status(500).json({
        message: err.message,
        stack: err.stack
    });
}

function boomErrorHandler (err, req, res, next){
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    } else {
        next(err);
    }    
}

function ormErrorHandler (err, req, res, next){
    if (err instanceof ValidationError) {
        res.status(409).json({
            statusCode: 409,
            message: err.name,
            errors: err.errors
        });
    } else {
        next(err);
    }    
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler }