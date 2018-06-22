const { Schema } = require('mongoose')

module.exports = new Schema({
    route: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    likes: [String]
    
})
