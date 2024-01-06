import app from "./server.js";
import mongodb from "mongodb";
import ReviewsDAO from "./dao/reviewsDAO.js"; //use ReviewsDAO to interact with db and perform CRUD operations on reviews

// set up a connection to a MongoDB db, and start the server to handle incoming requests

// MongoDB Connection Details
const MongoClient = mongodb.MongoClient;
const mongo_username = process.env['MONGO_USERNAME'];
const mongo_password = process.env['MONGO_PASSWORD'];

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.cxt2ayg.mongodb.net/?retryWrites=true&w=majority`;

// Server Configuration and Connection
const port = 8000;

MongoClient.connect(  //connect to the MongoDB Atlas cluster with the specified options
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
    }
).catch(err => {  //if connection fails, an error is logged, and the process exits with an error code
    console.error(err.stack);
    process.exit(1);
}).then(async (client) => {  //if succeeds, Express.js app is started, and the server begins listening on the specified port
    await ReviewsDAO.injectDB(client);
    app.listen(port,()=>{
        console.log(`Listening on port ${port}`);
    });
});