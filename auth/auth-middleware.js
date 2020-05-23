// dependency imports
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

//middleware
const secrets = require('./secrets.js')

// checks to make sure that he username and password are present before trying to log in
function isValid(user){
  return Boolean(
      user.email && 
      user.password && 
      typeof user.password === 'string'
      )
}

// checks to make sure that all the information is present for when you try to register
const validate = (req, res, next) => {
  const user = req.body;
  if(!user){ // checks there is a user
      res.status(401).json({ 
          message: "Please ensure you have filled out the form and resubmit"
       });
} else if(!user.name){ // checks there is a name
    res.status(400).json({
        message: "Please provide a name for the user"
    })
  } else if(!user.email){
      res.status(400).json({ // checks there is an email
        message: "Please provide a email for the user"
    })
  } else if (!user.password || typeof user.password !== 'string' || user.password.length < 8){
    res.status(400).json({ // checks there is a password
        message: "Please provide a valid password for the user"
    })
  } else if (!user.cohort){
      res.status(400).json({ // checks there is a cohort
          message: "Please provide a cohort for the user"
      })
  } else if(Boolean(user.student === false) && Boolean(user.helper === false)){
      res.status(400).json({ // checks that they have marked student/helper
          message: "Please check if you are a student and/or a helper"
      })
  } else {
      next();
  }
};

// hashes the password upon regisration
function passHash(info){
    const user = info;
    const hash = bcryptjs.hashSync(user.password, 12);
    user.password = hash;
    return user;
}

// creates token on login
function createToken(user){
  const payload = {
      sub: user.id,
      name: user.name,
      username: user.email,
      cohort: user.dept_id,
      student: user.student,
      helpter: user.helper
  };
  const options = {
      expiresIn: '24h'
  }
  return jwt.sign(payload, secrets.jwtSecret, options)
}

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if(token){
      jwt.verify(token, secrets.jwtSecret, (err, decToken) => {
          if(err){
              res.status(401).json({
                      message: "Invalid Authorization Received"
              })
          } else {
              req.jwt = decToken;
              next();
          }
      })
  } else {
      res.status(401).json({
          message: "Please provide the correct authorization"
      })
  }
}

module.exports = {
  validate,
  passHash,
  createToken,
  verifyToken,
  isValid
}