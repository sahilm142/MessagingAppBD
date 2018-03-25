var express = require('express');
var router = express.Router();

var User = require('../models/user');

/**
 * Allows users to send messages to another user
 * if the sender is in blocklist of the reciever
 * (You are blocked)
 */

router.post('/sendmessage',function(req,res){
    console.log("Message request");
    var from    = req.body.from;
	var toUser  = req.body.toUser;
	var subject = req.body.subject;
    var content = req.body.content;
    
	User.getUserByUserName(toUser, function(err, user){
      if(!user) {
          console.log("User doesn't exist");
          res.send("User doesn't exist");
    }
      else{
        var inbox = user.inbox;
        if(inbox==null)inbox=[];
        var message = {
          sender    : from,
          subject   : subject,
          content   : content
          };
      //Check in the blocklist of the reciever
      if(user.blockList.indexOf(from)!==-1){
          res.send("You can't send message to this user");
      } else{
      inbox.push(message);
      user.inbox = inbox;
      user.save();
      console.log(inbox);
      res.send("Message Sent");
      }
      }  
	});
});

/**
 * Returns all messages send to the logged in user
 */
router.get('/inbox', function(req, res){
	if(req.isAuthenticated()){
        //var user = req.body.username;
        console.log(req.user.username);
        console.log(req.user.inbox);
        res.send(req.user.inbox);
	}
	else{   
		res.send('Login first');
	}
});

module.exports = router;