// be able to update yourself as a user

// set up router
const router = require('express').Router();

// model
const Users = require('./usersmodel.js');

// middleware
const {verifyToken} = require('../auth/auth-middleware.js');

// endpoints
    // be able to get all users if logged in
router.get('/', verifyToken, (req, res) => {
    Users.getAll()
        .then(users => {
            if(users.length == 0){
                res.status(404).json({
                    message: "There are no users"
                })
            }else{
                res.status(200).json({
                    data: users
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                errorMessage: "Error retrieving users",
                error
            })
        })
})

router.put('/:id')

module.exports=router;