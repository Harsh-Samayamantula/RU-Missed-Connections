var express = require('express')
var router = express.Router()

var feedController = require('../controllers/feed')

router.get("/posts/:campus", async (req, res, next) => {
    try {
        let campusCode = -1
        let campus = req.params['campus'].toLowerCase();
        if (campus == 'livingston') campusCode = 0
        else if (campus == 'busch') campusCode = 1
        else if (campus == 'cook_douglass') campusCode = 2
        else if (campus == 'college_ave') campusCode = 3
        feedController.getPosts(campus=campusCode).then(posts => {
            res.json(posts)
        })
    } catch (err) {
        next(err);
    }
})

router.get("/posts", async (req, res, next) => {
    try {
        feedController.getPosts().then(posts => {
            res.json(posts)
        })
    } catch (err) {
        next(err);
    }
})

router.get("/comments/:pid", async (req, res, next) => {
    try {
        feedController.getComments(req.params["pid"]).then(comments => {
            res.json(comments)
        })
    } catch (err) {
        next(err);
    }
})

router.post("/posts", async (req, res, next) => {
    // console.log("helo")
    var data = req.body;
    // console.log(data)
    data.session = data.sessionId
    if (data.session) {
        try {
            // console.log("made it here")
            res.sendStatus(200).send(
                await feedController.createPost(data.session, data.content, data.longitude, data.latitude, data.location, data.campus)
            )
        }
        catch (err) {
            next(err);
        }
    }
})

router.post("/comments", async (req, res, next) => {
    var data = req.body;
    if (data.session) {
        try {
            res.sendStatus(200).send(
                await feedController.createComment(data.session, data.pid, data.content))
        }
        catch (err) {
            next(err);
        }
    }
})

module.exports = router;