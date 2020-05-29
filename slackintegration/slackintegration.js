const router = require('express').Router()
const Slack = require('./slackmodel.js')
const bodyParser = require('body-parser')
// lets you translate the req.body from x-www-urlencoded to json
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// allows you to retrieve a list of tickets that were submitted through slack
router.get('/slack/tickets', (req, res) => {
    Slack.getAll()
    .then(tickets => {
        res.status(200).json(tickets)
    })
})

// allows you to post a ticket from slack to the server
router.post('/slack/tickets', urlencodedParser, (req, res) => {
    const slackmes = {text: req.body.text}
    Slack.addTicket(slackmes)
    .then(id => {
        res.send({
            response_type: "in_channel",
            text: "ticket sent successfully"
        })
    })
})

module.exports=router;