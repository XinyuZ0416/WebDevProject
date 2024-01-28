const mongoose = require('mongoose')

const connectDB = url =>{    
    return mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
        useFindAndModify: false
        })
        .then(console.log('db connected'))
}

module.exports = connectDB



