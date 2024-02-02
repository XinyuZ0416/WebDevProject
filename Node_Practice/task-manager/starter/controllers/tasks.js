const Task = require('../models/Task.js')

// define CRUD operations

const getAllTasks = async (req,res) => {
    try{
        const tasks = await Task.find({})
        res.status(200).json({tasks})
    }catch(err){
        res.status(500).json({err})
    }
}

const getTask = async (req, res) => {
    try{
        const task = await Task.findOne({_id:req.params.id})

        if(!task){
            return res.status(404).json({msg:`no task with id: ${req.params.id}`})
        }else{
            res.status(200).json({task})
        }
        
    }catch(err){
        res.status(500).json({msg:err})
    }
}

const createTask = async(req, res) => {
    try{
        const task = await Task.create(req.body)
        res.status(201).json({task})
    }catch(err){
        res.status(500).json({err})
    }
}

const updateTask = async (req, res) => {
    try{
        const task = await Task.findOneAndUpdate({_id:req.params.id}, req.body,{new:true, runValidators:true})
        if(!task){
            return res.status(404).json({msg:`no task with id: ${req.params.id} to update`})
        }
        res.status(200).json({task})
    }catch(err){
        res.status(500).json({err})
    }
}

const deleteTask = async (req, res) => {
    try{
        const task = await Task.findOneAndDelete({_id:req.params.id})

        if(!task){
            return res.status(404).json({msg: `no task with id: ${req.params.id} to delete`})
        }
        res.status(200).json({task:null, success:true})
    }catch(err){
        res.status(500).json({err})
    }
}


module.exports = {getAllTasks, getTask, createTask, updateTask, deleteTask}