const express = require('express');
const dbConnect = require('./database/index');
const {PORT} = require("./config/index");
const router = require('./routes/index')
const app = express();

app.use(router);

dbConnect();

app.get('/', (req,res)=>{
    res.json({msg: '\hello-world'})
})

app.listen(PORT, console.log(`Backend is runnng on port: ${PORT}`))
