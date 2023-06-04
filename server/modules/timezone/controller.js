const express = require('express');

const Timezone = require('./models');

const router = express.Router();

router.get('/', (req, res) => {
    Timezone.find((err, data) => {
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


router.post('/addTimezone', (req, res) => {
    let model = new Timezone(req.body);
    model.save((err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json({
                success: true,
                message: 'Timezone has addded'
            });
        }
    });
});

module.exports = router;