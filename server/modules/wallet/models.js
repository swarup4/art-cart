const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const wallets = {
    _id: { type: objectId, auto: true },
    userId: { type: objectId, required: true },
    amountStatus: { type: String, required: true },
    reason: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: Boolean, default: 1 },
    createdDate: Date
};
const walletSchema = new Schema(wallets, { versionKey: false });

walletSchema.pre('save', function (next) {
    const currentDate = new Date();
    if (!this.createdDate) {
        this.createdDate = currentDate;
    }
    next();
});




module.exports = {
    Wallet: mongoose.model("wallet", walletSchema)
};