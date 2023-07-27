var express = require('express')
const { uploadChatMessage } = require('../controllers/chat')
var router = express.Router()

var chatController = require('../controllers/chat')

router.post("/chat/post", async (req, res, next) => {
    // console.log("posted to /chat")
    var data = req.body
    if (data.session) {
        try {
            uploadChatMessage(data.session, data.to, data.content, data.timestamp).then(() => {
                res.sendStatus(200);
            })
        } catch (err) {
            res.sendStatus(400)
            next(err);
        }
    }
})

router.post("/chat/get", async (req, res, next) => {
    // console.log("get from /chat")
    var data = req.body
    try {
        // console.log("searching")
        chatController.downloadChatMessages(data.session, data.to).then(chat => {
            // console.log("returning chat")
            res.json(chat)
        })
    } catch (err) {
        next(err);
    }
})

module.exports = router;