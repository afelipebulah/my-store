const { Client } = require('pg');

async function getConnection() {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'my_store',
        user: 'afelipebulah',
        password: 'admin123'
    });
    await client.connect();
    return client;
}

module.exports = getConnection;