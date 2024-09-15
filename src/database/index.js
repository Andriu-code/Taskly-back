const { MongoClient } = require('mongodb');
const debug = require('debug')('app:module-database');

const { Config } = require('../config/index')

var connection = null;
module.exports.Database = (collection) => new Promise(async (resolve, reject) => {
    try {
        if (!connection) {  // si no existe la conexion, crear una. un singleton para no crear demasiadas conexiones
            const client = new MongoClient(Config.mongoUri);
            connection = await client.connect();
            debug('Nueva conexion realizada con MongoDB Atlas')
        }
        debug('Reutilizando conexion')  // si existe conexion, se reutiliza la que ya existe
        const db = connection.db(Config.mondoDbname);
        resolve(db.collection(collection))
    } catch (error) {
        reject(error)
    }
});
