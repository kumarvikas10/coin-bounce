const dotenv = require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_CONNECTIONSTRING = process.env.MONGODB_CONNECTIONSTRING;

module.exports = {
    PORT,
    MONGODB_CONNECTIONSTRING
}