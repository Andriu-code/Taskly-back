const { ObjectId } = require('mongodb');

const { Database } = require('../database/index');

const COLLECTION = 'tasks';

const getAll = async () => {   // traer todas las tareas
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();  //retorna toda la coleccion de tareas y lo muestra como un array
}

const getById = async (id) => {  //traer tarea por id
    const collection = await Database(COLLECTION);
    const objectId = new ObjectId(id)
    return await collection.findOne({ _id: objectId });
}

const create = async (task) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(task);
    return result.insertedId;
}

const update = async (id, task) => {
    const collection = await Database(COLLECTION);
    const { _id, ...updateData } = task;
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
}

const deleteTask = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.deleteOne({ _id: new ObjectId(id) });
};

module.exports.TasksService = {
    getAll,
    getById,
    create,
    update,
    deleteTask
}