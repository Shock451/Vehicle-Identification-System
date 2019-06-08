var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    usergroup: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);
module.exports = User;