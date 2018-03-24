var express = require('express');
var bodyParser=require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();

mongoose.connect("mongodb://localhost/messagingapp");
var db = mongoose.connection;

var users = require('./routes/users');
var messaging=require('./routes/messaging');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', users);
app.use('/messaging',messaging);

app.listen(3004, function(){
    console.log("Server Connected");
}); 