const express = require('express');

const Faq = require('./models');

const router = express.Router();

router.get('/', (req, res) => {
    Faq.find((err, data) => {
        if (err) {
            res.status(404).send(err.message);
        } else {
            res.json({
                success: true,
                data: data
            });
        }
    });
});


/* 
{ currencyCode: 'INR', format: 'INR 00.00', createdBy: 'superadmin' }
*/
router.post('/addFaq', (req, res) => {
    let model = new Faq(req.body);
    model.save((err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json({
                success: true,
                message: 'Faq has Added'
            });
        }
    });
});

module.exports = router;