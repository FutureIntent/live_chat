var express = require('express');
var router = express.Router();
const validate = require('./../auth/auth.js');
const uuid = require('uuid');

router.post('/auth', (req, res) => {

    //get request body and create session-cookie
    if (!req.body.username) {
        res.status(400).json({status: false, message: 'Enter username'})
    }

    const id = uuid.v4();

    req.session.userId = id;
    req.session.auth = true
    req.session.username = req.body.username

    res.status(200).json({status: true, message: 'success'});
});

router.get('/test', validate, (req, res) => {
    console.log(req.session);
    res.send('hi');
});


module.exports = router;