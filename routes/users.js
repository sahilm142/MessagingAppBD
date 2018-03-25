var express = require('express');
var router  = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

/**
 * Allows users to register herself on the platform with basic information
 */
router.post('/register', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;

	console.log(username+password+firstname);
		
		var newUser = new User({
			username: username,
			password: password,
			firstname: firstname,
			last: lastname,
			inbox:[]
		});

		console.log(newUser);
		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});
	res.send("Registered");
});

passport.serializeUser(function(user, done) {
	done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
	User.getUserById(id, function(err, user) {
	  done(err, user);
	});
  });

passport.use(new LocalStrategy(
	function(username, password, done){
		User.getUserByUserName(username, function(err, user){
			if(err) throw err;
			if(!user){
				return done(null,false,{message:'Unknown User'});
			} 
			User.comparePassword(password,user.password,function(err,isMatch){
				if(err) throw err;
				if(isMatch){
					return done(null,user);
				} else{
					return done(null,false,{message:'Invalid Password'});
				}
			});
		});
	}));

/**
 * Should authenticate and login user
 */
router.post('/login',
	passport.authenticate('local', {failureRedirect:'/users/login'}),
	function(req, res) {
	  res.send('Logged In Successful');
	});

/**
 * Allows logged in users to block another user from sending messages to them
 * first check whether user is logged in or not
 */

router.put('/block/:username', function(req, res){
	if(req.isAuthenticated()){
		var user = req.user;
		var blockList = user.blockList;
		var blockUser = req.params.username;
		if(blockList.indexOf(blockUser)!==-1){
			res.send("User already in blockList");
		}else{
			blockList.push(blockUser);
	  	user.blockList = blockList;
			user.save();
			res.send("User added to blockList");
		}
	  
	} else{
		res.send("Login First");
	}
});

module.exports = router;