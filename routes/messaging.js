var express = require('express');
var router = express.Router();

var User = require('../models/user');

//Send Message

router.post('/sendmessage',function(req,res){
    console.log("Message request");
    var from    =req.body.from;
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
    inbox.push(message);
    user.inbox=inbox;
    user.save();
    console.log(inbox);
    res.send("DONE");
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