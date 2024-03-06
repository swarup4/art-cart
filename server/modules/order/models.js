let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let objectId = Schema.ObjectId;

let order = {
    _id: { type: objectId, auto: true },
    username: { type: String, required: true },
    orderTime: Date,
    contactNo: { type: Number, required: true },
    deliverAddress: { type: String, required: true },
    email: { type: String, require: true },
    expectedDeliverDate: { type: Date, require: true },
    paidStatus: { type: Boolean, default: 0 },
    deliveryStatus: { type: Boolean, default: 0 }
}
const orderSchema = new Schema(order, { versionKey: false });

orderSchema.pre('save', function (next) {
    // get the current date
    let currentDate = new Date();
    // if created_at doesn't exist, add to that field
    if (!this.orderTime) {
        this.orderTime = currentDate;
    }
    next();
});

let orderDetails = {
    _id: { type: objectId, auto: true },
    username: { type: String, required: true },
    orderTime: Date,
    contactNo: { type: Number, required: true },
    deliverAddress: { type: String, required: true },
    email: { type: String, require: true },
    expectedDeliverDate: { type: Date, require: true },
    paidStatus: { type: Boolean, default: 0 },
    deliveryStatus: { type: Boolean, default: 0 }
}
const orderDetailsSchema = new Schema(orderDetails, { versionKey: false });

module.exports = {
    ProductComment: mongoose.model("order", orderSchema),
    ProductFeedback: mongoose.model("orderDetails", orderDetailsSchema),
}