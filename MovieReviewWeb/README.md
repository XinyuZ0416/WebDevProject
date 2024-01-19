(If the add/ delete review functions are not working, it's because they need authorization credentials to my mongo db to run.)

index.js ——————————
1.	Sets up a connection to MongoDB Atlas cluster (MongoDB cloud)
2.	Injects MongoDB client into DAO to interact with db
3.	launches server to process incoming HTTP requests

server.js ——————————
Configures an Express web server with middleware (cors, json parsing, routing)

reviews.route.js ——————————
Sets up an Express router for interactions with movie reviews

reviews.controller.js ——————————
Defines routing action

reviewsDAO.js ——————————
1.	Defines CRUD operation
2.	Interacts with MongoDB