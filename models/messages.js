var mongoose = require('mongoose');

//Message Schema

var messageSchema = mongoose.Schema({
    sender:String,
    reciever:String,
    messages:[{
        subject:String,
        content:String
    }]
});

var Messages = module.exports = mongoose.model('Messages',messageSchema);