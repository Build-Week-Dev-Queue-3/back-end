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


module.exports={
    getAll,
    findById,
    add
}