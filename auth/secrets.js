require('dotenv').config();
// this is just for secret passwords

const jwtSecret = process.env.JWT_SECRET;

module.exports={
    jwtSecret
}
