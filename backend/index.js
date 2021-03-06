import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import restaurantsDAO from "./dao/restaurantsDAO.js"
import reviewsDAO from "./dao/reviewsDAO.js"
dotenv.config();
const MongoClient = mongodb.MongoClient;

const port  = process.env.PORT || 8000;

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {maxPoolSize:50, //max 50 connections at the same time
    wtimeoutMS:2500, //cancel the connection if it takes more than 250seconds
    useNewUrlParser: true,}
)
.catch((err)=>{
    console.error(err.stack);
    process.exit(1)
})
.then(async client => { 
    await restaurantsDAO.injectDB(client) //initial reference to the restaurants in the database
    await reviewsDAO.injectDB(client)  //create new reviews collection
    app.listen(port, ()=> { //start server
        console.log(`listening on port ${port}`)
    })
})