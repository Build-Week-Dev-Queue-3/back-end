// dependency installs
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// routers

// middleware


// server init
const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

// main endpoints




// export
module.exports=server;