var express = require('express');
var bodyParser=require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var LocalStrategy = require('passport-local').Strategy;
var app = express();

mongoose.connect("mongodb://localhost/messagingapp");
var db = mongoose.connection;

var users = require('./routes/users');
var messaging = require('./routes/messaging');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Passport init
app.use(passport.initialize());
app.use(passport.session());

//Express Session
app.use(session({
    secret:'secret',
    saveUninitialized:true,
    resave:true
}));

app.use('/users', users);
app.use('/messaging',messaging);

// Set Port
app.set('port', (process.env.PORT || 3004));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});
