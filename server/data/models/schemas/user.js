const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')
const Image = require('./image')
const Park = require('./park')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true
    },
    race: {
        type: String,
        default: "Others"
    },
    gender: {
        type: String,
    },
    description: {
        type: String,
    },
    photoProfile: { 
        type: String,
    },
    birthdate: { 
        type: Date,
    },
    city: {
        type: String,
    },
    zip: {
        type: String,
    },
    friends: [{
        type: ObjectId,
        ref: this
    }],
    loves: [{
        type: ObjectId,
        ref: this
    }],
    parks: [{
        type: ObjectId,
        ref: Park
    }],
    images:[Image],
    notifications:[String]
})