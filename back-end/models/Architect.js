var mongoose = require('mongoose');

var ArchitectSchema = mongoose.Schema({
    first_name: String, 
    last_name: String, 
    bio: String,
});

module.exports = mongoose.model('Architect', ArchitectSchema);