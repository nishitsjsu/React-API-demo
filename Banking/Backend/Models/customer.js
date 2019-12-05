var mongoose = require('mongoose');

var customer = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: String },
    accountnumber: { type: Number },
    routingnumber: { type: Number },
    balance: { type: Number },
    phone: { type: String, required: true },
    address: { type: String, required: true },
})

module.exports = mongoose.model('Customer', customer);