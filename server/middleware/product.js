const Product = require('../modules/product/models');
const Review = require('../modules/review/models');

const products = {
    deleteProductDetails: (req, res, next) => {
        const productId = req.params.id;
        Product.Details.findByIdAndDelete(productId, (err, data) => {
            if (err) {
                res.send(err.message);
            } else {
                next();
            }
        })
    },
    
    uploadProductImage: (req, res, next) => {
        const client = s3Client;
        const params = uploadParams;
        
        params.Key = req.file.originalname;
        params.Body = req.file.buffer;
            
        client.upload(params, (err, data) => {
        	if (err) {
        		res.status(500).json({error:"Error -> " + err});
        	}
        	res.json('Product Image uploaded successfully');
        });
    },

    deleteProductReview: (req, res, next) => {
        const productId = req.params.id;
        Review.Comment.findByIdAndDelete(productId, (err, data) => {
            if (err) {
                res.send(err.message);
            } else {
                next();
            }
        })
    }
};

module.exports = products;