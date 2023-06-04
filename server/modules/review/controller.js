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
router.post('/product/addReview', userMiddleware.varifyToken, (req, res) => {
    let obj = req.body;
    obj.commentStatus = (obj.comment.length > 0) ? 1 : 0;
    let model = new Review.ProductComment(obj);
    model.save((err, data) => {
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


// Gallery
router.get('/gallery/allReview/:galleryId', (req, res) => {
    const galleryId = req.params.galleryId;
    Review.GalleryComment.aggregate([{
        $match: {
            galleryId: ObjectId(galleryId)
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
            galleryId: '$galleryId',
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
router.post('/gallery/addReview', userMiddleware.varifyToken, (req, res) => {
    const obj = req.body;
    obj.commentStatus = (obj.comment.length > 0) ? 1 : 0;
    let model = new Review.GalleryComment(req.body);
    model.save((err, data) => {
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

/**
 * {
 *      "userId": objectId,
        "fname": "Swarup",
        "lname": "Saha",
        "like": true
 * }
 */
router.post('/gallery/addReply/:id', userMiddleware.varifyToken, (req, res) => {
    const reviewId = req.params.id;
    const obj = req.body;
    // obj.like = (obj.like === true) ? 1 : 0;
    obj.replyDate = new Date();

    Review.GalleryComment.findOneAndUpdate({ _id: reviewId }, { $push: { reply: obj } }, {
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
router.get('/gallery/getFeedback/:galleryId', (req, res) => {
    const galleryId = req.params.galleryId;
    Review.GalleryFeedback.aggregate([{
        $match: {
            galleryId: ObjectId(galleryId)
        }
    }, {
        $group: {
            _id: ObjectId(galleryId),
            like: { $sum: { $cond: ["$like", 1, 0] } },
            share: { $sum: { $cond: ["$share", 1, 0] } }
        }
    }]).then(data => {
        res.json(data[0]);
    }).catch(err => {
        res.send(err);
    });
});

// Add Like & Share Functionality
router.post('/gallery/addFeedback', userMiddleware.varifyToken, (req, res) => {
    const galleryId = req.body.galleryId;
    const userId = req.body.userId;
    const obj = req.body
    obj.feedbackDate = new Date();

    Review.GalleryFeedback.findOneAndUpdate({ galleryId: galleryId, userId: userId }, obj, {
        new: true,
        upsert: true // Make this update into an upsert
    }, (err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json({
                success: true,
                message: 'Review inserted for gallery'
            });
        }
    });
});


// Event
router.get('/event/allReview/:eventId', (req, res) => {
    const eventId = req.params.eventId;
    Review.EventComment.aggregate([{
        $match: {
            eventId: ObjectId(eventId)
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
            eventId: '$eventId',
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
    "eventId": "609976e781f2da5ce0a67dd2",
    "userId": "609976e781f2da5ce0a67dd2",
    "rating": 5,
    "reviewHeading": "Awesome Event",
    "review": "This just made our living room fantastic. Goes well with the Hand-Painted Wall Painting.",
    "reviewImage": ["The Abstract Ocean Bubble 1.jpg", "The Abstract Ocean Bubble 2.jpg"],
    "reviewerName": "Swarup Saha",
    "reviewerEmail": "swarup.saha004@hotmail.com"
};
*/
router.post('/event/addReview', userMiddleware.varifyToken, (req, res) => {
    const obj = req.body;
    obj.commentStatus = (obj.comment.length > 0) ? 1 : 0;
    let model = new Review.EventComment(req.body);
    model.save((err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json({
                success: true,
                message: 'Review inserted for Event'
            });
        }
    });
});

/**
 * {
 *      "userId": objectId,
        "fname": "Swarup",
        "lname": "Saha",
        "like": true
 * }
 */
router.post('/event/addReply/:id', userMiddleware.varifyToken, (req, res) => {
    const reviewId = req.params.id;
    const obj = req.body;
    // obj.like = (obj.like === true) ? 1 : 0;
    obj.replyDate = new Date();

    Review.EventComment.findOneAndUpdate({ _id: reviewId }, { $push: { reply: obj } }, {
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

// Get Like & Share count based on Event ID
router.get('/event/getFeedback/:eventId', (req, res) => {
    const eventId = req.params.eventId;
    Review.EventFeedback.aggregate([{
        $match: {
            eventId: ObjectId(eventId)
        }
    }, {
        $group: {
            _id: ObjectId(eventId),
            like: { $sum: { $cond: ["$like", 1, 0] } },
            share: { $sum: { $cond: ["$share", 1, 0] } }
        }
    }]).then(data => {
        res.json(data[0]);
    }).catch(err => {
        res.send(err);
    });
});

// Add Like & Share Functionality
router.post('/event/addFeedback', userMiddleware.varifyToken, (req, res) => {
    const eventId = req.body.eventId;
    const userId = req.body.userId;
    const obj = req.body
    obj.feedbackDate = new Date();

    Review.EventFeedback.findOneAndUpdate({ eventId: eventId, userId: userId }, obj, {
        new: true,
        upsert: true // Make this update into an upsert
    }, (err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json({
                success: true,
                message: 'Review inserted for event'
            });
        }
    });
});

module.exports = router;