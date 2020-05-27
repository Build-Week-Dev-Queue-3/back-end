const db = require('../data/dbConfig.js');

function getAll(){
    return db('slack')
}

function addTicket(ticket){
    return db('slack')
            .insert(ticket, 'id')
            .then(id => {
                return db('slack')
            })
}

module.exports = {getAll, addTicket}