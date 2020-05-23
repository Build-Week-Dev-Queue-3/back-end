const db = require('../data/dbConfig.js');


// get all users
function getAll(){
    return db('users')
}

// find a user by ID
function findById(id){
    return db('users')
            .where({id})
            .first()
}

// add a user
async function add(user){
    try{
        const [id] = await db('users')
                            .insert(user, "id")
                        return findById(id)
    } catch(error){
        throw error;
    }
}

// find a user by passed in filter

function findUsersBy(filter){
    // console.log(filter)
       return db('users')
            .where(filter)
}

function updateUser(user){
    return db('users')
            .where({id: user.id})
            .update(user, 'id')
}


// can update only if user id matches
module.exports={
    add,
    findById,
    findUsersBy,
    getAll,
    updateUser
}