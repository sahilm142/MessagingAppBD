var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');


// Register User
router.post('/register', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;

	console.log(username+password+firstname);
		
		var newUser = new User({
			username: username,
			password:password,
			firstname: firstname,
			last: lastname
		});

		console.log(newUser);
		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
			console.log("user");
		});
	res.send("DONE");
});

module.exports = router;