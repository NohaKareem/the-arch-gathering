var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');

const VALIDATION_MSG = " is required";

var UserSchema = mongoose.Schema({
    username: { type: String, required: [true, "Username" + VALIDATION_MSG] }, 
    email: { type: String, required: [true, "Email" + VALIDATION_MSG] }, 
    first_name: String, 
    last_name: String, 
    saved_archs: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Architecture'
    }]
});

var options = ({ missingUsernameError: "Incorrect username", missingPasswordError: "Incorrect password" });
UserSchema.plugin(plm, options);

module.exports = mongoose.model('User', UserSchema);