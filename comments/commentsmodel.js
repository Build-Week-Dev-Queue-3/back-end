const db = require('../data/dbConfig.js');
const Tickets = require('../tickets/tickets-model.js')
// add a comment to a ticket
function addComment(comment){
    return db('comments')
            .insert(comment, 'id')
}

function findCommentsForTicket(id){
    return db('comments as c')
            .where('c.ticket_id',id)
            .join('users as u', 'u.id', 'c.commenter_id')
            .join('tickets as t', 't.id', 'c.ticket_id' )
            .select('c.id', 'c.ticket_id', 'u.name', 'c.comment', 'u.name', 't.subject', 't.ticket_text' )

            
}

function findcById(id){
    return db('comments')
            .where({id})
            .first()
}

function removeComment(id){
    return findById(id)
            .then(comment => {
                const delcomment = comment
                    return db('comments')
                            .where({id})
                            .first()
                            .del()
                            .then(count => {
                                return delcomment;
                            })
            })
}

module.exports={addComment, removeComment, findcById, findCommentsForTicket};