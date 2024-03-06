const express = require('express');

const Uom = require('./models');

const router = express.Router();

router.get('/', (req, res) => {
    Uom.find((err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json({
                success: true,
                data: data
            });
        }
    });
});


router.post('/addUom', async (req, res) => {
    try {
        let model = new Uom(req.body);
        let uom = await model.save();
        if (uom) {
            res.json({
                success: true,
                message: 'Uom has addded'
            });
        }
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;