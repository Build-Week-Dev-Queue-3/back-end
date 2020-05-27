const tickets = require('../tickets/tickets-model.js');
const comments = require('../comments/commentsmodel.js');

const idMatch = (req, res, next) => {
    const myId = req.jwt.sub
    if(myId == req.params.id){
        next();
    } else {
        res.status(401).json({
            message: "You can only update your own user profile"
        })
    }

}

const myTicket = (req, res, next) => {
    const myId = req.jwt.sub
    const ticketid = req.params.uid
    if (myId == ticketid){
        next();
    } else {
        res.status(401).json({
            message: "You can only modify your own tickets"
        })
    }
}

const isHelper = (req, res, next) => {
    const helper = req.jwt.helper
    if(helper === true){
        next();
    } else {
        res.status(401).json({
            message: "Must be a helper to change ticket status"
        })
    }
}

function getAllTickets(){
    const allTickets = []
        tickets.getAll()
        .then(ticks => {
            ticks.forEach((item, i) => {
                comments.findCommentsForTicket(item.id)
                .then(resp => {
                    const tick = {tickets:ticks, comments: resp}
                    console.log(tick)
                    allTickets.push(tick)
            
                })
                return allTickets
            })

        })

}


module.exports={
    idMatch,
    myTicket,
    isHelper,
    getAllTickets

}