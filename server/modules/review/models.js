const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const review = {
    _id: { type: objectId, auto: true },
    productId: { type: objectId, required: true },
    userId: { type: objectId, required: true },
    role: { type: String, required: true },
    rating: { type: Number, required: true },
    commentStatus: Boolean,
    comment: { type: String, required: true },
    image: [String],
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    reply: [{
        userId: objectId,
        fname: String,
        lname: String,
        reviewerEmail: String,
        commentStatus: Boolean,
        comment: String,
        like: Boolean,
        replyDate: Date,
    }],
    status: { type: Boolean, default: 1 },
    createdAt: Date
};

const reviewSchema = new Schema(review, { versionKey: false, timestamps: true });

// Feedback
const feedback = {
    _id: { type: objectId, auto: true },
    productId: { type: objectId, required: true },
    userId: { type: objectId, required: true },
    like: { type: Boolean, default: 0 },
    share: { type: Boolean, default: 0 },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: Date,
};
const feedbackSchema = new Schema(feedback, { versionKey: false, timestamps: true });


module.exports =  {
    ProductComment: mongoose.model("review", reviewSchema),
    ProductFeedback: mongoose.model("feedback", feedbackSchema),
}