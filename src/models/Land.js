const mongoose = require('mongoose');

const landSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    coordinates: { type: Object, required: true },
    price: { type: Number, required: true },
    isForSale: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Land', landSchema)