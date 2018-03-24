var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var Messages = require('../models/messages');


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
			last: lastname,
			inbox:[]
		});

		console.log(newUser);
		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
			console.log("user");
		});
	res.send("DONE");
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

//Authenticate
router.post('/login',
	passport.authenticate('local', {failureRedirect:'/users/login'}),
	function(req, res) {
	  res.send('Logged In');
	});

//Send Message
router.post('/sendmessage',function(req,res){
	var toUser = req.body.toUser;
	var subject = req.body.subject;
	var content = req.body.content;
	User.getUserByUserName(toUser,function(err,user){
		if(err) throw err;
		if(!user){
			return done(null,false,{message:'Invalid User'});
		}
		console.log(user);
		res.send(user);

	});
});

//Inbox
// router.get('/inbox',function(req,res){
// 	if(req.isAuthenticated()){
// 		res.send("Messages");
// 	}
// 	else{
// 		res.send('Login first');
// 	}
// });

module.exports = router;