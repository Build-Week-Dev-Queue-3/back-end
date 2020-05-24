// dependency installs
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// routers
const AuthRouter = require('../auth/auth-router.js');
const UsersRouter = require('../users/usersrouter.js');
const TicketsRouter = require('../tickets/ticketsrouter.js');
const CommentsRouter = require('../comments/commentsrouter.js')

// middleware


// server init
const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

// main endpoints
    // register and login
server.use('/auth', AuthRouter);
    // users
server.use('/users', UsersRouter);
    // tickets
server.use('/tickets', TicketsRouter)
    // comments
server.use('/tickets', CommentsRouter)

// GET to ensure server is up
server.get('/', (req, res) => {
    res.status(200).json({
        api: "API is onlilne"
    })
})

// export
module.exports=server;