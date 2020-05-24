// set up router
const router = require('express').Router();

// model
const Comments = require('./commentsmodel.js');

// middleware
const {verifyToken} = require('../auth/auth-middleware.js');
const {myComment} = require('../server/server-middleware.js')
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

router.delete('/:id/comments/:cid', (req, res) => {
    const commentId = req.params.cid
    Comments.findById(commentId)
            .then(comment => {
                const myId = req.jwt.sub;
                const commenter = comment.commenter_id
                if(commenter == myId){
                    Comments.removeComment(commentId)
                        .then(deleted => {
                            res.status(200).json({
                                message: "deleted ok",
                                deleted
                            })
                        })
                        .catch(error => {
                            res.status(500).json({
                                message: "Error deleting comment",
                                error
                            })
                        })
                } else {
                    res.status(500).json({
                        message: "You can only delete your own comments"
                    })
                }
            })


} )




module.exports=router;