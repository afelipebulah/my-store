const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');

let options = {
    dialect: config.dbEngine,
    logging: !config.isProd
}

if(config.isProd){
    options.dialectOptions = {
        ssl: {
            rejectUnauthorized: false
        }
    }  
}

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

//NO se recomienda usar el sync() para entornos productivos.
//Debe reemplazarse por la configuración respectiva de migraciones en bbdd.
//sequelize.sync();

module.exports = sequelize;