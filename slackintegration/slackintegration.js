const router = require('express').Router()
const Slack = require('./slackmodel.js')

router.get('/slack/tickets', (req, res) => {
    Slack.getAll()
    .then(tickets => {
        res.status(200).json(tickets)
    })
})


router.post('/slack/tickets', (req, res) => {
    Slack.addTicket(req.body)
    .then(id => {
        res.status(200)
    })
})

module.exports=router;