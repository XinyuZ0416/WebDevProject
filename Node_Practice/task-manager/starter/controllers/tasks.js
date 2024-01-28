const getAllTasks = (req,res) => res.send('get all tasks')

const getTask = (req, res) => res.json({id: req.params.id})

const createTask = (req, res) => res.json(req.body)

const updateTask = (req, res) => res.send('update one task')

const deleteTask = (req, res) => res.send('delete one task')


module.exports = {getAllTasks, getTask, createTask, updateTask, deleteTask}