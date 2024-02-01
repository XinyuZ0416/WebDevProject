const Task = require('../models/Task.js')

const getAllTasks = (req,res) => res.send('get all tasks')

const getTask = (req, res) => res.json({id: req.params.id})

const createTask = async(req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json(task)
}
const updateTask = (req, res) => res.send('update one task')

const deleteTask = (req, res) => res.send('delete one task')


module.exports = {getAllTasks, getTask, createTask, updateTask, deleteTask}