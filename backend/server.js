const express = require('express');
const dbConnect = require('./database/index');
const {PORT} = require("./config/index");
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

app.use(router);

dbConnect();

app.get('/', (req,res)=>{
    res.json({msg: '\hello-world'})
})

app.use(errorHandler); //Always Register at the end of the app

app.listen(PORT, console.log(`Backend is runnng on port: ${PORT}`))
