const express = require('express');
const auth = require('../middleware/auth');
const Land = require('../models/Land');
const router = express.Router();

router.post('/create', async (req, res) => {
    const { coordinates, price } = req.body;
    const land = await Land.create({
        ownerId: req.user.id,
        coordinates,
        price,
        isForSale: false
    });
    res.json(land);
});

router.get('/', async (req, res) => {
    const lands = await Land.find().populate('ownerId', 'email');
    res.json(lands);
})

router.put('/toggle-sale/:id', auth, async (req, res) => {
    const { id } = req.params;
    const land = await Land.findById(id);
    if (!land) {
        return res.status(404).json({ error: 'Land not found' });
    }
    if (land.ownerId.toString() !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized' })
    }
    land.isForSale = !land.isForSale;
    await land.save();
    res.json(land);
})

module.exports = router;