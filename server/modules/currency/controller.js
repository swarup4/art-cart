const express = require('express');
const fetch = require('node-fetch');

const CurrencyFormat = require('./models');

const router = express.Router();

router.get('/', (req, res) => {
    CurrencyFormat.find((err, data) => {
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

module.exports = router;