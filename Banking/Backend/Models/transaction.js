var mongoose = require('mongoose');

var transaction = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    sender: String,
    receiver: String,
    date: { type: Date, default: Date.now },
    amount: Number,
    purpose: String
})

module.exports = mongoose.model('Transaction', transaction);