const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASS = encodeURIComponent(config.dbPass);

const URI = `${config.dbEngine}://${USER}:${PASS}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
    dialect: config.dbEngine,
    logging: false
});

setupModels(sequelize);

//NO se recomienda usar el sync() para entornos productivos.
//Debe reemplazarse por la configuración respectiva de migraciones en bbdd.
//sequelize.sync();

module.exports = sequelize;