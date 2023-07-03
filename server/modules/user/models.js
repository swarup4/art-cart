const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;


const user = {
    _id: { type: objectId, auto: true },
    fname: String,
    lname: String,
    username: [String],
    email: String,
    password: String,
    countryCode: Number,
    phone: Number,
    emailVerified: { type: Boolean, default: 0 },
    phoneVerified: { type: Boolean, default: 0 },
    createdAt: Date,
    updatedAt: Date,
    status: { type: Boolean, default: 1 }
};
const userSchema = new Schema(user, { versionKey: false, timestamps: true });


// User Details
const userDetails = {
    _id: { type: objectId, auto: true },
    userId: { type: objectId, required: true },
    about: String,
    language: String,
    address: String,
    city: String,
    state: String,
    country: String,
    pinCode: String,
    // region: String,
    // timezone: String,
    geoLocation: String,
    createdAt: Date,
    updatedAt: Date
};
const userDetailsSchema = new Schema(userDetails, { versionKey: false, timestamps: true });


// User Group
const userGroup = {
    _id: { type: objectId, auto: true },
    userId: { type: objectId, required: true },
    group: String,
    subGroup: [String],
    createdAt: Date,
    updatedAt: Date
};
const userGroupSchema = new Schema(userGroup, { versionKey: false, timestamps: true });


// User Profile Pics
const userProfilePics = {
    _id: { type: objectId, auto: true },
    userId: { type: objectId, required: true },
    profilePics: String,
    createdAt: Date,
    updatedAt: Date
};
const userProfilePicsSchema = new Schema(userProfilePics, { versionKey: false, timestamps: true });


module.exports = {
    Auth: mongoose.model("user", userSchema),
    Details: mongoose.model("userDetails", userDetailsSchema),
    Group: mongoose.model("userGroup", userGroupSchema),
    ProfilePics: mongoose.model("userProfilePics", userProfilePicsSchema)
};