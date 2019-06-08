const User = require('../models/user');
var express = require('express');
const passport = require('passport');
var router = express.Router();

router.post('/signup', (req, res, next) => {
    User.register(new User({
        username: req.body.username,
        usergroup: req.body.type == "on" ? 1 : 2,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
    }),
        req.body.password, (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    err: err
                });
            } else {
                passport.authenticate('local', {failureRedirect: '/'})(req, res, () => {
                    User.findOne({
                        username: req.body.username
                    }, (err, person) => {
                        req.session.user = person;
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.redirect("/")
                    });
                })
            }
        })
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
    User.findOne({
        username: req.body.username
    }, (err, person) => {
        req.session.user = person;
        res.statusCode = 200;
        res.redirect("/")
    })
});

router.get('/logout', (req, res, next) => {
    if (req.session) {
        req.logout();
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                res.clearCookie('session-id');
                res.redirect("/")
            }
        });
    } else {
        var err = new Error('You are not logged in!');
        err.status = 403;
        next(err);
    }
});

module.exports = router;