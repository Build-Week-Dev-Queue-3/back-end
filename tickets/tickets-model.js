const db = require('../data/dbConfig.js')
const Comments = require('../comments/commentsmodel.js')
// get all tickets
function getAll(){
    return db('tickets as t')
            .join('statuses as s', 's.id', 't.status_id')
            .join('users as u', 'u.id', 't.user_id')
            .select('t.id', 't.user_id', 'u.name', 't.subject', 't.ticket_text', 's.status' )
}
// find a ticket by ID
function findById(id){
    return db('tickets as t')
            .where('t.id',id)
            .join('users as u', 'u.id', 't.user_id')
            .join('statuses as s', 't.status_id', 's.id')
            .first()
            .select('t.id', "t.user_id", 'u.name', 't.subject', 't.ticket_text', 't.status_id', 's.status' )
            .then(resp => {
                const ticket = resp
                console.log(resp)
                return Comments.findCommentsForTicket(resp.id)
                .then(comments => {
                    const fullTicket = {...ticket, comments}
                    return fullTicket
                })
            })
}
async function add(ticket){
    try{
        const [id] = await db('tickets')
                            .insert(ticket, "id")
                            return findById(id)
    } catch(error){
        throw error;
    }
}

function findByUserId(id){
    return db('tickets as t')
            .where('t.user_id', id)
            .join('statuses as s','s.id', 't.status_id' )
            .join('users as u', 't.user_id', 'u.id')
            .select('t.subject', 't.ticket_text', 'u.name', 's.status')

}

function updateTicket(id, ticket){
    const ticketed=ticket
    console.log('ticket', ticketed)
       return db('tickets')
            .where({id})
            .first()
            .update(ticket, 'id')
            .then(count => {
                return findById(id)
            })
}

function remove(id){
    return findById(id)
            .then(ticket => {
                const delticket = ticket
                return db('tickets')
                        .where({id})
                        .first()
                        .del()
                        .then(count => {
                            return delticket;
                        })
            })
}

function updateStatus(id, status){
    return db('tickets')
            .where({id})
            .first()
            .update(status, 'id')
            .then(count => {
                return findById(id)
            })
}

module.exports={
    getAll,
    findById,
    add,
    findByUserId,
    updateTicket,
    remove,
    updateStatus
}