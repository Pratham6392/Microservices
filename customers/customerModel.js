const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    Address: {
        type: String,
        required: true
    }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;