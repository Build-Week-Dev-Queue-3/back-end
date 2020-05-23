const idMatch = (req, res, next) => {
    const myId = req.jwt.sub
    if(myId == req.params.id){
        next();
    } else {
        res.status(401).json({
            message: "You can only update your own user profile"
        })
    }

}


module.exports={
    idMatch
}