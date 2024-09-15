const createError = require('http-errors');
const debug = require('debug')('app:module-tasks-controller');

const { TasksService } = require('./services')
const { Response } = require('../common/response')

module.exports.TasksController = {
    getTasks: async (req, res) => {
        try {
            let tasks = await TasksService.getAll();
            Response.success(res, 200, 'Tareas', tasks);
        } catch (error) {
            debug(error);
            Response.error(res)
        }
    },
    getTask: async (req, res) => {
        try {
            const { params: { id } } = req;
            let task = await TasksService.getById(id);
            if (!task) {
                Response.error(res, new createError.NotFound())
            } else {
                Response.success(res, 200, `Tarea ${id}`, task);
            }
        } catch (error) {
            debug(error);
            Response.error(res)
        }
    },
    createTask: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest())
            } else {
                const insertedId = await TasksService.create(body);
                Response.success(res, 201, 'Tarea creada', insertedId)
            }
        } catch (error) {
            debug(error);
            Response.error(res)
        }
    },
    updateTask: async (req, res) => {
        try {
            const { params: { id } } = req;
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest())
            } else {
                const task = await TasksService.update(id, body);
                Response.success(res, 201, `Tarea actualizada ${id}`, body)
            }
        } catch (error) {
            debug(error);
            Response.error(res)
        }
    },
    deleteTask: async (req, res) => {
        try {
            const { id } = req.params; // Obtener el ID de los parámetros de la URL
            if (!id) {
                return Response.error(res, new createError.BadRequest("ID es requerido"));
            }
            const task = await TasksService.deleteTask(id);

            if (!task) {
                // Si la tarea no se encuentra, devolvemos un error 404
                return Response.error(res, new createError.NotFound(`Tarea no encontrada con id: ${id}`));
            }
            Response.success(res, 200, `Tarea eliminada con id: ${id}`);

        } catch (error) {
            debug(error);
            Response.error(res, new createError.InternalServerError("Error eliminando la tarea"));
        }
    },
};