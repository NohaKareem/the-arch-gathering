var mongoose = require('mongoose');

var ArchitectureSchema = mongoose.Schema({
    name: String, 
    // address: String, 
    location_city: String, 
    image: String,
    architects: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Architect'
    }],
    year: Number, 
    description: String, 
    comments: [
        {
            comment: String, 
            author: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'User'
            }
        }
    ] 
});

module.exports = mongoose.model('Architecture', ArchitectureSchema);