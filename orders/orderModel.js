const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    getDate: {
        type: Date,
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;