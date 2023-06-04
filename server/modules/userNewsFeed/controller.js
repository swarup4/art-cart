const express = require('express');
const ObjectId = require("mongoose").Types.ObjectId;

const Product = require('../product/models');
const UserFeed = require('./models');

const router = express.Router();

// Get all wishlist Based on User Id
router.get('/getProductByUser/:userId', (req, res) => {
    const userId = req.params.userId;
    Product.Category.aggregate([
        {
            $match: {
                userId: ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: 'feedbacks',
                localField: '_id',
                foreignField: 'productId',
                as: 'feedback'
            }
        }, {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            }
        }, {
            $lookup: {
                from: 'users',
                localField: 'collab',
                foreignField: '_id',
                as: 'collab'
            }
        }, {
            $project: {
                _id: '$_id',
                userId: '$userId',
                fname: '$user.fname',
                lname: '$user.lname',
                collab: '$collab',
                productName: '$productName',
                category: '$category',
                subCategory: '$subCategory',
                productType: '$productType',
                location: '$location',
                size: '$size',
                price: '$price',
                color: '$color',
                rarity: '$rarity',
                waysToBuy: '$waysToBuy',
                buyFrom: '$buyFrom',
                productImage: '$productImage',
                createdDate: '$createdDate',
                status: '$status',
                feedback: {
                    $cond: {
                        if: { $eq: [{ $size: '$feedback' }, 0] },
                        then: [{}],
                        else: '$feedback'
                    }
                }
            }
        },
        { $unwind: '$feedback' },
        { $unwind: '$fname' },
        { $unwind: '$lname' },
        {
            $group: {
                _id: '$_id',
                userId: { $first: '$userId' },
                fname: { $first: '$fname' },
                lname: { $first: '$lname' },
                collab: { $first: '$collab' },
                productName: { $first: '$productName' },
                category: { $first: '$category' },
                subCategory: { $first: '$subCategory' },
                productType: { $first: '$productType' },
                location: { $first: '$location' },
                size: { $first: '$size' },
                price: { $first: '$price' },
                color: { $first: '$color' },
                rarity: { $first: '$rarity' },
                waysToBuy: { $first: '$waysToBuy' },
                buyFrom: { $first: '$buyFrom' },
                productImage: { $first: '$productImage' },
                like: {
                    $sum: { $cond: ['$feedback.like', 1, 0] }
                },
                share: {
                    $sum: { $cond: ['$feedback.share', 1, 0] }
                },
                createdDate: {
                    $first: '$createdDate'
                },
                status: {
                    $first: '$status'
                }
            }
        }, {
            $unset: ['collab.password', 'collab.emailVerified', 'collab.phoneVerified', 'collab.status', 'collab.role',
                'collab.email', 'collab.phone', 'collab.countryCode', 'collab.updatedDate', 'collab.createdDate', 'collab.securityCode'
            ]
        }
    ]).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});


router.get('/getUserFeed/:userId', (req, res) => {
    const userId = req.params.userId;
    UserFeed.aggregate([{
        $lookup: {
            from: 'products',
            localField: 'productId',
            foreignField: '_id',
            as: 'product'
        }
    }, 
    { $unwind: '$product' },
    { $unset: 'productId' },
    {
        $match: {
            userId: ObjectId(userId)
        }
    }]).then(data => {
        res.json(data);
    }).catch(err => {
        res.send(err);
    });
});

module.exports = router;