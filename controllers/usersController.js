// REQUIREMENTS
var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var passport = require('passport');

// IS LOGGED IN
router.get('/isLoggedIn', function(req, res) {
    if (req.isAuthenticated() == true) {
        // console.log("IS LOGGED IN, BETCH: " + req.user);
        res.send(req.user);
    }
    else {
        console.log("not logged in");
        res.send("not logged in");
    }
});

// SIGNUP
router.post('/signup', passport.authenticate('local-signup', {
    failureRedirect: '/'}), function(req, res){
    console.log("USER STUFF HERE   " + req.user);
    res.send(req.user);
});


// middleware to check login status
function isLoggedIn(req, res, next) {
    console.log('isLoggedIn middleware');     
    if (req.isAuthenticated()) {
        console.log("successful login!")
        return next(); 
    } else {      
        console.log("BAD LOGIN")
        res.redirect('/');
    }
};

module.exports = router;