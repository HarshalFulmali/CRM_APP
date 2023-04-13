const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config');
const serverConfig = require('./configs/servers.config');
const bodyParser = require('body-parser')
const app = express();


mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

app.use(bodyParser.json());

db.on('error',(error)=>{
    console.log("Error while connecting to data base",error);
})

db.once("open", () => {
    console.log("Connected to Mongodb successfully");
})

require('./Routes/userRoutes')(app);
require('./Routes/authRoutes')(app);

app.listen(serverConfig.PORT,()=>{
    console.log(`Application running on port ${serverConfig.PORT}`);
})
