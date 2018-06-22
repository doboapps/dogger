const mongoose = require('mongoose')
const { Image } = require('./schemas')

module.exports = mongoose.model('Image', Image)