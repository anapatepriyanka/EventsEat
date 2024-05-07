const User = require('../models/user-model')
const mongoose = require('mongoose')
const {Schema, model} = mongoose
const enquirySchema = new Schema ({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    catererId: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    message: String,
    response: String
},{timestamps: true})
const Enquiry = model('Enquiry', enquirySchema)
module.exports = Enquiry