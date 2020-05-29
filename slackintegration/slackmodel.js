const db = require('../data/dbConfig.js');

// get all of the tickets posted from slack
function getAll(){
    return db('slack')
}

// add a ticket from slack
function addTicket(ticket){
    return db('slack')
            .insert(ticket, 'id')
            .then(id => {
                return db('slack')
            })
}

module.exports = {getAll, addTicket}