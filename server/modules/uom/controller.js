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


router.post('/addUom', (req, res) => {
    let model = new Uom(req.body);
    model.save((err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json({
                success: true,
                message: 'Uom has addded'
            });
        }
    });
});

module.exports = router;