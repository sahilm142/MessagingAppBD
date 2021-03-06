var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var MessageSchema = mongoose.Schema({
sender    : String,
subject   : String,
content   : String,
timeStamp : {type:Date, Default:Date.now}
});

var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	inbox:[MessageSchema],
	blockList:[String]
});

var User = module.exports = mongoose.model('User', UserSchema);
// Create user 
module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}
//Compare Password
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
// Get User by Id
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}
// Get user by username
module.exports.getUserByUserName = function(username, callback){
	var query = {username:username};
	User.findOne(query,callback);
}
