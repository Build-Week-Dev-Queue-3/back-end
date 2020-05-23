// set up router
const router = require('express').Router();

// model
const Tickets = require('./tickets-model.js');

// middleware 
const {verifyToken} = require('../auth/auth-middleware.js');

router.use(verifyToken)

// endpoints
    // be able to create a ticket
router.post('/', (req, res) => {
    const userId=req.jwt.sub;
    const ticket=req.body;
    const newTicket={...ticket, user_id: userId}
    Tickets.add(newTicket)
        .then(ticket => {
            res.status(201).json({
                message: "Ticket submitted successfully",
                data: ticket
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "Failed to submit ticket, please try again",
                error
            })
        })
})

    // be able to get a list of your tickets

    // be able to update your own ticket

    // be able to delete your own ticket

    // as a helper, be able to update the status of the ticket


module.exports=router;