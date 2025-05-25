const express = require("express");
const Bid = require('../models/Bid');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/place', auth, async (req, res) => {
    const { landId, amount } = req.body;
    const user = await User.findById(req.user.id);
    if (user.balance < amount) {
        return res.status(400).json({ error: 'Insufficient balance' });
    }
    try {
        const bid = await Bid.create({
            landId,
            bidderId: req.user.id,
            amount
        })
        res.json(bid);
    }
    catch (error) {
        res.status(400).json({ error: 'Error placing bid' });
    }

})

router.get('/land/:landId', async (req, res) => {
    const { landId } = req.params;
    const bids = await Bid.find({ landId }).populate('bidderId', 'email');
    res.json(bids);
})

module.exports = router;