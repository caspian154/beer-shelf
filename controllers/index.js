'use strict';

var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.sendFile('home.html',{'root': __dirname + '/../templates'});
});

router.get('/showSignInPage',function(req,res){
    res.sendFile('signin.html',{'root': __dirname + '/../templates'});
})

router.get('/showSignUpPage',function(req,res){
  res.sendFile('signup.html',{'root':__dirname + '/../templates'})
})

router.use('/api', require('./users'))

module.exports = router;
