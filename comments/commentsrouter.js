// set up router
const router = require('express').Router();

// model
const Comments = require('./commentsmodel.js');

// middleware
const {verifyToken} = require('../auth/auth-middleware.js');

router.use(verifyToken);

// endpoints
    // be able to add a comment

router.post('/:id/comments', verifyToken, (req, res) => {
    const ticketId = parseInt(req.params.id);
    const commenterId = req.jwt.sub;
    const comment = req.body.comment
    const infoToAdd = {ticket_id: ticketId, commenter_id: commenterId, comment: comment}
    Comments.addComment(infoToAdd)
        .then(ticket => {
            res.status(201).json({
                data: ticket
            })
        })
})




module.exports=router;