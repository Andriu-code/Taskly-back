const express = require('express');

const { TasksController } = require('./controller')

const router = express.Router(); //manejar las rutas independientemente de la aplicacion

module.exports.TasksAPI = (app) => {
    router
        .get('/', TasksController.getTasks)
        .get('/:id', TasksController.getTask)
        .post('/', TasksController.createTask)
        .put('/:id', TasksController.updateTask)
        .delete('/:id', TasksController.deleteTask)

    app.use('/api/tasks', router)         //configurar en una ruta que se configure
}