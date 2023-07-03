const express = require('express');
const ObjectId = require("mongoose").Types.ObjectId;

const Wallet = require('./models');

const router = express.Router();

// Get all wishlist Based on User Id
router.get('/getTotalAmount/:userId', (req, res) => {
    const userId = req.params.userId;
    Wallet.aggregate([
        {
            $match: {
                amountStatus: "Success",
                userId: ObjectId(userId)
            }
        }, {
            $group: {
                _id: "$userId",
                TotalSum: { $sum: "$amount" }
            }
        }
    ]).then(data => {
        res.json(data);
    }).catch(err => {
        res.send(err);
    });
});

/* 
{
    "userId": "609ab05eabddac700c9e5420",
    "amountStatus": "Success",
    "reason": "Refund",
    "amount": 30,
}
*/
router.post('/addMoney', async (req, res) => {
    try {
        let model = new Wallet(req.body);
        let wallet = await model.save();
        if (wallet) {
            res.json({
                success: true,
                message: 'Amount add into Wallet'
            });
        }
    } catch (error) {
        res.send(error);
    }
});

/*{
    "userId": "609ab05eabddac700c9e5420",
    "amountStatus": "Success",
    "reason": "Withdrow",
    "amount": -30,
    "status": 0,
}*/
router.post('/withdrowMoney', async (req, res) => {
    try {
        let model = new Wallet(req.body);
        let wallet = await model.save();
        if (wallet) {
            res.json({
                success: true,
                message: 'Amount add into Wallet'
            });
        }
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;