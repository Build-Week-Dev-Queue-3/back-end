const db = require('../data/dbConfig.js');
const Tickets = require('../tickets/tickets-model.js')
// add a comment to a ticket
function addComment(comment){
    return Tickets.findById(comment.ticket_id)
            .then(tickets => {
                const ticketed = tickets
                return db('comments')
                .insert(comment, 'id')
                .then(id => {
                    return findCommentsForTicket(comment.ticket_id)
                        .then(comments => {
                            const ticket = {...ticketed, comments} 
                            console.log('commented', ticket)
                            return ticket;
                        })
                })
            })
}

function findCommentsForTicket(id){
    return db('comments as c')
            .where('c.ticket_id',id)
            
}


module.exports={addComment};