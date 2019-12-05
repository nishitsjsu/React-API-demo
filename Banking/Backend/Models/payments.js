var mongoose = require('mongoose');

var payments = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    sender: String,
    receiver: String,
    date: { type: Date, default: Date.now },
    amount: Number,
    purpose: String,
    type: String,
    period: String
})

module.exports = mongoose.model('Payments', payments);