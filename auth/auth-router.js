// dependency imports
const router = require('express').Router();
const bcryptjs = require('bcryptjs');

// model
const Users = require('../users/usersmodel.js');

// middleware
const {passHash, validate, createToken, isValid} = require('./auth-middleware.js');

// endpoints
router.post('/register', validate, (req, res) => {
    // implement registration
    const user = req.body;
    const newUser = passHash(user)
    const email = user.email
    Users.findUsersBy({email})
        .then(user => {
            console.log(user)
            if(user.length > 0){
                res.status(400).json({
                    message: "There is already an account with that email, if yours yours, login instead"
                })
            } else {
                Users.add(newUser)
                .then(user => {
                    res.status(201).json({
                        data: user
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        message: "Could not add user at this time, please try again later",
                        error
                    })
                })
            } 
        })
  });
  
  router.post('/login', (req, res) => {
    // implement login
        const {email, password} = req.body;
      if(isValid(req.body)){
          Users.findUsersBy({email})
              .then(([user]) => {
                  if(user && bcryptjs.compareSync(password, user.password)){
                      token = createToken(user)
                      res.status(200).json({
                          message: "Logged in successfully",
                          user,
                          token
                      })
                  } else {
                      res.status(401).json({
                          message: "Unauthorizd Access Attempted"
                      })
                  }
              })
              .catch(error => {
                  res.status(500).json({
                      error,
                      message: error.message
                  })
              })
      } else {
          res.status(400).json({
              message: "Please ensure your username and password are valid"
          })
      }
  });

module.exports=router;