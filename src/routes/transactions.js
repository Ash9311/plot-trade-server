const express = require("express");
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const Land = require('../models/Land');
const User = require('../models/User');
const router = express.Router();

router.post('/sell', auth, async (req, res) => {
    const { landId, buyerId, amount } = req.body;
    const land = await Land.findById(landId);
    if (land.ownerId != req.user.id) {
        return res.status(403).json({ error: 'Not authorized' });
    }
    const buyer = await User.findById(buyerId);
    if (buyer.balance < amount) {
        return req.status(400).json({ error: "Buyer has insufficient balance" })
    }

    try {
        await User.findByIdAndUpdate(req.user.id, { $inc: { balance: amount } });
        await User.findByIdAndUpdate(buyerId, { $inc: { balance: -amount } });

        land.ownerId = buyerId;
        land.isForSale = false;
        await land.save();

        const transaction = await Transaction.create({
            landId,
            sellerId: req.user.id,
            buyerId,
            amount
        });
        res.json(transaction);
    }
    catch {
        res.status(400).json({ error: 'Error processing transaction' })
    }

})

module.exports = router;