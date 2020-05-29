const db=require('../../data/dbConfig.js')

async function upload(file){
    try{
        const [id] = await db('uploads')
                        .insert(file, 'id')
    }catch(error){
        throw error;
    }
}

module.exports={
    upload
}