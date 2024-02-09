const express = require('express')
const app = express()
const tasks = require('./routes/tasks.js')
const connectDB = require('./db/connect.js')
require('dotenv').config()
const notFound = require('./middleware/not-found.js')

// parse json
app.use(express.static('./public'))
app.use(express.json())

// route
app.use('/api/v1/tasks', tasks)

app.use(notFound)

const port = 3000


const start = async ()=>{
    try{ //if connecting to db fails, no need to start server
        await connectDB(process.env.MONGO_URI)
        app.listen(3000, (req, res)=> console.log(`listening on port ${port}`))
    }catch(error){
        console.log(error)
    }
}

start()