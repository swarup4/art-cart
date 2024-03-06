const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;


const admin = {
    _id: { type: objectId, auto: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    role: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    countryCode: { type: Number, required: true },
    phone: { type: Number, required: true },
    emailVerified: { type: Boolean, default: 0 },
    createdAt: Date,
    updatedAt: Date,
    status: { type: Boolean, default: 1 }
};
const adminSchema = new Schema(admin, { versionKey: false, timestamps: true });


// User Profile Pics
const adminProfilePics = {
    _id: { type: objectId, auto: true },
    userId: { type: objectId, required: true },
    profilePics: String,
    createdAt: Date,
    updatedAt: Date
};
const adminProfilePicsSchema = new Schema(adminProfilePics, { versionKey: false, timestamps: true });


module.exports = {
    Auth: mongoose.model("admin", adminSchema),
    ProfilePics: mongoose.model("adminProfilePics", adminProfilePicsSchema)
};