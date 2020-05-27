// set up router
const router = require('express').Router();

// model
const Tickets = require('./tickets-model.js');
const Comments = require('../comments/commentsmodel.js');

// middleware 
const {verifyToken} = require('../auth/auth-middleware.js');
const {myTicket, isHelper, getAllTickets} = require('../server/server-middleware.js');
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
router.get('/users/:id', (req, res) => {
    const userId = req.jwt.sub;
    Tickets.findByUserId(userId)
        .then(tickets => {
            if(tickets.length === 0){
                res.status(404).json({
                    message: "User has no tickets"
                })
            } else {
                res.status(200).json({
                    data: tickets
                })
            }
        })
})
    // be able to update your own ticket
router.put('/:id/user/:uid', myTicket, (req, res) => {
    const ticketid = req.params.id;
    const ticket = req.body
    Tickets.updateTicket(ticketid, ticket)
        .then(ticket => {
            res.status(200).json({
                message: "Ticket Updated Successfully",
                ticket
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "Error updating ticket",
                error
            })
        })
})
    // be able to delete your own ticket
router.delete('/:id/user/:uid', myTicket, (req, res) => {
    const ticketid = req.params.id
    Tickets.remove(ticketid)
        .then(ticket => {
            res.status(200).json({
                message: "Ticket deleted successfully",
                deletedTicket: ticket
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "Error deleting ticket",
                error
            })
        })
})
    // as a helper, be able to update the status of the ticket
router.patch('/:id', isHelper, (req, res) => {
    const id = req.params.id;
    const status = req.body
    Tickets.updateStatus(id, status)
        .then(ticket => {
            res.status(200).json({
                data:ticket
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Error updating status',
                error
            })
        })
})
    // be ale to get a list of all the tickets
// router.get('/', (req, res) => {
//     Tickets.getAll()
//         .then(tickets => {
//             tickets.forEach((item, i) => {
//                 Comments.findCommentsForTicket(item.id)
//                 .then(resp => {
//                     const tick = {tickets:tickets[i], comments: resp}
//                     console.log(tick)
//                     res.status(200).json({
//                         tick

//                     })
//                 })
//             })
//         })
// })

router.get('/', (req, res)=> {
    Tickets.getAll()
    .then(tickets => {
        res.status(200).json({
            data: tickets
        })
    })
})
// router.get('/',(req, res) => {
//    const allTickets =  getAllTickets()
//     .then(resp => {
//         res.status(200).json({
//             allTickets
//         })
//     })
// })


router.get('/:id', (req, res) => {
    Tickets.findById(req.params.id)
    .then(ticket => {
        res.status(200).json({
            data: ticket
        })
    })
})

// router.get('/all', (req, res) => {
//     Tickets.getAllTicketsIncludeComments()
//     .then(tickets => {
//         res.status(200).json({
//             data: tickets
//         })
//     })
// })
module.exports=router;