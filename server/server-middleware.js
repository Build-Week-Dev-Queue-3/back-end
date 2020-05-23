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

module.exports={
    idMatch,
    myTicket,
    isHelper
}