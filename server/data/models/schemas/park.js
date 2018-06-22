const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')
const User = require('./user')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    creator: {
        type: ObjectId,
        ref: User
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    users: [{
        type: ObjectId,
        ref: User
    }],

})