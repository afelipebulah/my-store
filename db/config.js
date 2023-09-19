const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASS = encodeURIComponent(config.dbPass);

const URI = `${config.dbEngine}://${USER}:${PASS}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
    development: {
        url: URI,
        dialect: config.dbEngine
    },
    production: {
        url: URI,
        dialect: config.dbEngine
    }
}