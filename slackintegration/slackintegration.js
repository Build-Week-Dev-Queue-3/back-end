const router = require('express').Router()
const Slack = require('./slackmodel.js')
const bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/slack/tickets', (req, res) => {
    Slack.getAll()
    .then(tickets => {
        res.status(200).json(tickets)
    })
})


router.post('/slack/tickets', urlencodedParser, (req, res) => {
    const slackmes = {text: req.body.text, user: req.body.user_name}
    Slack.addTicket(slackmes)
    .then(id => {
        res.send({
            response_type: "in_channel",
            text: "ticket sent successfully"
        })
    })
})

module.exports=router;