var express = require('express');
var router = express.Router();

var User = require('../models/user');

/**
 * Allows users to send messages to another user
 */

router.post('/sendmessage',function(req,res){
    console.log("Message request");
    var from    = req.body.from;
	var toUser  = req.body.toUser;
	var subject = req.body.subject;
    var content = req.body.content;
    
	User.getUserByUserName(toUser,function(err,user){
      var inbox=user.inbox;
      if(inbox==null)inbox=[];
      var message={
        sender    : from,
        subject   : subject,
        content   : content
        };

    if(user.blockList.indexOf(from)!==-1){
        res.send("Blocked");
    } else{
    inbox.push(message);
    user.inbox=inbox;
    user.save();
    console.log(inbox);
    res.send("DONE");
    }
	});
});

/**
 * Returns all messages send to the logged in user
 */
router.get('/inbox',function(req, res){
	if(req.isAuthenticated()){
        var user = req.body.username;
        console.log(req.user.username);
        console.log(req.user.inbox);
        res.send(req.user.inbox);
	}
	else{   
		res.send('Login first');
	}
});

module.exports = router;