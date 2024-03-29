const asyncWrapper = require('../middleware/async.js')
const Task = require('../models/Task.js')

// define CRUD operations, using asyncWrapper middleware

const getAllTasks = asyncWrapper( async (req,res) => {
    const tasks = await Task.find({})
    res.status(200).json({tasks})
})

const getTask = asyncWrapper(async (req, res) => {
        const task = await Task.findOne({_id:req.params.id})

        if(!task){
            return res.status(404).json({msg:`no task with id: ${req.params.id}`})
        }else{
            res.status(200).json({task})
        }
})

const createTask = asyncWrapper(async(req, res) => {
        const task = await Task.create(req.body)
        res.status(201).json({task})
})

const updateTask = asyncWrapper(async (req, res) => {
        const task = await Task.findOneAndUpdate({_id:req.params.id}, req.body,{new:true, runValidators:true})
        if(!task){
            return res.status(404).json({msg:`no task with id: ${req.params.id} to update`})
        }
        res.status(200).json({task})
})

const deleteTask = asyncWrapper(async (req, res) => {
        const task = await Task.findOneAndDelete({_id:req.params.id})

        if(!task){
            return res.status(404).json({msg: `no task with id: ${req.params.id} to delete`})
        }
        res.status(200).json({task:null, success:true})
})


module.exports = {getAllTasks, getTask, createTask, updateTask, deleteTask}