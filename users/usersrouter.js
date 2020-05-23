// set up router
const router = require('express').Router();

// model
const Users = require('./usersmodel.js');

// middleware
const {verifyToken, passHash} = require('../auth/auth-middleware.js');
const {idMatch} = require('../server/server-middleware.js');
router.use(verifyToken);

// endpoints
    // be able to get all users if logged in
router.get('/', (req, res) => {
    Users.getAll()
        .then(users => {
            if(users.length === 0){
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

    // be able to update yourself as a user
router.put('/:id', idMatch, (req, res) => {
    const user = req.body
    const id = req.jwt.sub
    const newPass = passHash(user)
    const newUser = {...user, password:newPass.password, id:id}
        Users.updateUser(newUser)
        .then(count => {
            Users.findById(req.params.id)
                .then(user => {

                    res.status(200).json({
                        user
                    })
                })
        })
})

module.exports=router;