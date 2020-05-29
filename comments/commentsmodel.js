const db = require('../data/dbConfig.js');
const Tickets = require('../tickets/tickets-model.js')
// add a comment to a ticket
function addComment(comment){
    return db('comments')
            .insert(comment, 'id')
}
// finds all the comments for a ticket
function findCommentsForTicket(id){
    return db('comments as c')
            .where('c.ticket_id',id)
            .join('users as u', 'u.id', 'c.commenter_id')
            .join('tickets as t', 't.id', 'c.ticket_id' )
            .select('c.id', 'c.ticket_id', 'u.name', 'c.comment', 'u.name', 't.subject', 't.ticket_text' )

            
}
// finds a comment by id
function findcById(id){
    return db('comments')
            .where({id})
            .first()
}
// lets you delete a comment
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