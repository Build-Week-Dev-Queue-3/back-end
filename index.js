// server import
const server = require('./server/server.js');

// dependency imports
const colors = require('colors');
require('dotenv').config();

// .env info
const environment = process.env.NODE_ENV;
const port = process.env.PORT;

// turn on the server
server.listen(port, () => {
    console.log(`\n === Server listening in ${environment} mode on localhost://${port}`.magenta.bold.underline)
})