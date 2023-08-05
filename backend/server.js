const express = require('express');
const dbConnect = require('./database/index');
const {PORT} = require("./config/index");
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(router);

dbConnect();

app.use('/storage',express.static('storage'));

app.use(errorHandler); //Always Register at the end of the app

app.listen(PORT, console.log(`Backend is runnng on port: ${PORT}`))
