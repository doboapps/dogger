const mongoose = require('mongoose')
const { Park } = require('./schemas')

module.exports = mongoose.model('Park', Park)