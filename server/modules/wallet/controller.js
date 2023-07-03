const express = require('express');
const ObjectId = require("mongoose").Types.ObjectId;

const Wallets = require('./models');

const router = express.Router();

// Get all wishlist Based on User Id
router.get('/getTotalAmount/:userId', (req, res) => {
    const userId = req.params.userId;
    Wallets.Wallet.aggregate([
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
router.post('/addMoney', (req, res) => {
    let model = new Wallets.Wallet(req.body);
    model.save((err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json({
                success: true,
                message: 'Amount add into Wallet'
            });
        }
    });
});

/*{
    "userId": "609ab05eabddac700c9e5420",
    "amountStatus": "Success",
    "reason": "Withdrow",
    "amount": -30,
    "status": 0,
}*/
router.post('/withdrowMoney', (req, res) => {
    let model = new Wallets.Wallet(req.body);
    model.save((err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json({
                success: true,
                message: 'Amount Withdrow'
            });
        }
    });
});



// Get all wishlist Based on User Id
// router.get('/getDonateAmount/:productId', (req, res) => {
//     const productId = req.params.productId;
//     Wallets.FundRaise.aggregate([
//         {
//             $match: { productId: ObjectId(productId) }
//         }, {
//             $group: {
//                 _id: "$productId",
//                 TotalSum: { $sum: "$amount" } 
//             }
//         }
//     ]).then(data => {
//         res.json(data);
//     }).catch(err => {
//         res.send(err);
//     });
// });

/* 
{
    "userId": "609ab05eabddac700c9e5420",
    "productId": "609946fdba377359532041ca",
    "amount": 30
}
*/
// router.post('/donate', (req, res) => {
//     let model = new Wallets.FundRaise(req.body);
//     model.save((err, data) => {
//         if (err) {
//             res.send(err.message);
//         } else {
//             res.json({
//                 success: true,
//                 message: 'Amount add into Fund Raise'
//             });
//         }
//     });
// });


// Get all wishlist Based on User Id
router.get('/getBidAmount/:productId', (req, res) => {
    const productId = req.params.productId;
    Wallets.Bid.aggregate([
        {
            $match: { productId: ObjectId(productId) }
        }, {
            $group: { 
                _id: "$productId",
                bid: { $max: "$amount" } 
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
    "productId": "609946fdba377359532041ca",
    "amount": 30,
}
*/
router.post('/bid', (req, res) => {
    let model = new Wallets.Bid(req.body);
    model.save((err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json({
                success: true,
                message: 'Bid done'
            });
        }
    });
});

module.exports = router;