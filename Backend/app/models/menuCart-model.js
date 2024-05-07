const Event = require('../models/event-model')
const Item = require('../models/menuItem-model')
const User = require('../models/user-model')

const mongoose = require('mongoose')
const{Schema, model} = mongoose
const menuCartSchema = new Schema({
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    itemId: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

},{timestamps: true})
const MenuCart = model('MenuCart', menuCartSchema)
module.exports = MenuCart