const db = require('../data/dbConfig.js')

// get all tickets
function getAll(){
    return db('tickets')
}

// find a ticket by ID
function findById(id){
    return db('tickets')
            .where({id})
            .first()
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
    return db('tickets')
            .where('user_id', id)

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