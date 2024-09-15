const express = require('express');
const debug = require('debug')('app:main');
const cors = require('cors');

const { Config } = require('./src/config/index');

const { TasksAPI } = require('./src/tasks/index')

const { IndexAPI, NotFoundAPI } = require('./src/index/index')

const app = express();
app.use(cors());

app.use(express.json());

IndexAPI(app);

TasksAPI(app);

NotFoundAPI(app);

//modulos

app.listen(Config.port, () => {
    debug(`Servidor escuchando en el puerto ${Config.port}`)
});