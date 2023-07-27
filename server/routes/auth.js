var express = require('express')

var logins = require('../controllers/logins')
var router = express.Router()

const passwordValidator = require('password-validator');
var schema = new passwordValidator();

schema
    .is().min(4)
    .is().max(8)
    .has().uppercase()
    .has().lowercase()
    .has().digits(4)
    .has().not().spaces()

function validateRequest(req){
    let { username, password, session } = req.body;
    if (!(username && password) && !session)
        return 400;

    if (!username /*&& !username.match("^[a-z]{2,3}\d{3,4}$")*/)
        return 401;
}

router.post("/login", async (req, res, next) => {
    if (validateRequest(req)) return;
    var { username, password, session } = req.body;
    if (username && password)
        try {
            logins.loginWithPassword(username, password).then((data) => {
                console.log("sending ",data)
                res.json(data)
            })
        } catch (err) {
            next(err);
        }

    else if (session)
        try {
            res.sendStatus(200).json(await logins.loginWithSessionId(session))
        } catch (err) {
            next(err);
        }
})

router.post("/register", async (req, res, next) => {
    console.log("posted to /register")
    console.log(`${username}:${password}`)
    // if (validateRequest(req)) return;
    var { username, password, fullName, gender, gradYear } = req.body;

    if (username && password) {
        console.log("try to register our user")
        try {
            logins.registerUser(username, password, fullName, gender, gradYear).then(status_code => {
                res.sendStatus(status_code)
            })
            // res.sendStatus(200).send(await logins.registerUser(username, password))
        } catch (err) {
            next(err);
        }
    }
})

module.exports = router;