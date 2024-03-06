const express = require('express');
const ObjectId = require("mongoose").Types.ObjectId;

const Wishlist = require('./models');

const router = express.Router();

// Get all wishlist Based on User Id
router.get('/getWishlist/:userId', (req, res) => {
    const userId = req.params.userId;
    Wishlist.aggregate([{
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

// Get Caregory wise wishlist Based on User Id
router.get('/getWishlist/:filter/:userId', (req, res) => {
    const userId = req.params.userId;
    const filter = req.params.filter;

    Wishlist.aggregate([{
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
            userId: ObjectId(userId),
            'product.category': filter
        }
    }]).then(data => {
        res.json(data);
    }).catch(err => {
        res.send(err);
    });
});

/* 
{
    "userId": "609ab05eabddac700c9e5420",
    "productId": "609961b081f2da5ce0a67dcf"
}
*/
router.post('/addWishlist', async (req, res) => {
    try {
        let model = new Wishlist(req.body);
        let wishlist = await model.save();
        if (wishlist) {
            res.json({
                success: true,
                message: 'Product Add into Wishlist Folder'
            });
        }
    } catch (error) {
        res.send(error);
    }
});

router.delete('/deleteWishlist/:id', (req, res) => {
    const id = req.params.id;
    wishlist.findByIdAndDelete(id, (err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json("Product remove from Wishlit");
        }
    });
});

module.exports = router;