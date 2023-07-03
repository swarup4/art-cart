const express = require('express');
const ObjectId = require("mongoose").Types.ObjectId;

const Review = require('./models');
const userMiddleware = require('../../middleware/user');

const router = express.Router();

// Product
router.get('/product/allReview/:productId', (req, res) => {
    const productId = req.params.productId;

    Review.ProductComment.aggregate([{
        $match: {
            productId: ObjectId(productId),
        }
    }, {
        $project: {
            like: {
                $size: {
                    $filter: {
                        'input': "$reply",
                        'as': 'el',
                        'cond': {
                            $eq: ['$$el.like', true]
                        }
                    }
                }
            },
            fname: '$fname',
            lname: '$lname',
            status: '$status',
            productId: '$productId',
            userId: '$userId',
            role: '$role',
            rating: '$rating',
            comment: '$comment',
            reviewDate: '$reviewDate',
            reply: '$reply'
        }
    }]).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

/* 
{
    "productId": "609976e781f2da5ce0a67dd2",
    "userId": "609976e781f2da5ce0a67dd2",
    "productType": "Photography",
    "rating": 5,
    "reviewHeading": "Awesome Product",
    "review": "This just made our living room fantastic. Goes well with the Hand-Painted Wall Painting.",
    "reviewImage": ["The Abstract Ocean Bubble 1.jpg", "The Abstract Ocean Bubble 2.jpg"],
    "reviewerName": "Swarup Saha",
    "reviewerEmail": "swarup.saha004@hotmail.com"
};
*/
router.post('/product/addReview', userMiddleware.varifyToken, async (req, res) => {
    try {
        let obj = req.body;
        obj.commentStatus = (obj.comment.length > 0) ? 1 : 0;
        let model = new Review.ProductComment(obj);
        let review = await model.save();
        if (review) {
            res.json({
                success: true,
                message: 'Review inserted for product'
            });
        }
    } catch (error) {
        res.send(error);
    }
});

/**
 * {
 *      "userId": objectId,
        "fname": "Swarup",
        "lname": "Saha",
        "reviewerEmail": "swarup.saha004@hotmail.com",
        "comment": String,
        "like": true,
        "replyDate": Date,
 * }
 */
router.post('/product/addReply/:id', userMiddleware.varifyToken, (req, res) => {
    const reviewId = req.params.id;
    const obj = req.body;
    // obj.like = (obj.like === true) ? 1 : 0;
    obj.commentStatus = (obj.comment.length > 0) ? 1 : 0;
    obj.replyDate = new Date();

    Review.ProductComment.findOneAndUpdate({ _id: reviewId }, { $push: { reply: obj } }, {
        new: true,
        upsert: true // Make this update into an upsert
    }, (err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json({
                success: true,
                message: 'User has replied for the review'
            });
        }
    });
});

// Get Like & Share count based on Product ID
router.get('/product/getFeedback/:productId', (req, res) => {
    const productId = req.params.productId;
    Review.ProductFeedback.aggregate([{
        $match: {
            productId: ObjectId(productId)
        }
    }, {
        $group: {
            _id: ObjectId(productId),
            like: { $sum: { $cond: ["$like", 1, 0] } },
            share: { $sum: { $cond: ["$share", 1, 0] } }
        }
    }]).then(data => {
        res.json(data);
    }).catch(err => {
        res.send(err);
    });
});

/*{
    "productId": "609976e781f2da5ce0a67dd2",
    "userId": "609ab05eabddac700c9e5420",
    "like": 1,
    "share": 1,
    "fname": "Swarup",
    "lname": "Saha",
    "email": "swarup.saha004@hotmail.com"
}*/
// Add Like & Share Functionality
router.post('/product/addFeedback', userMiddleware.varifyToken, (req, res) => {
    const productId = req.body.productId;
    const userId = req.body.userId;
    const obj = req.body
    obj.feedbackDate = new Date();

    Review.ProductFeedback.findOneAndUpdate({ productId: productId, userId: userId }, obj, {
        new: true,
        upsert: true // Make this update into an upsert
    }, (err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json({
                success: true,
                message: 'Review inserted for product'
            });
        }
    });
});

module.exports = router;