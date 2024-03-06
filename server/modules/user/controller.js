require('dotenv').config();

const express = require('express');
const jwt = require("jsonwebtoken");
const multer = require('multer');

const User = require('./models');
const userMiddleware = require('../../middleware/user');
// const config = require('../../helper/config');
// const email = require('../../middleware/email');
// const sendSMS = require('../../middleware/sendSMS');
// const phone = require('../../middleware/sendSMS');
// const uploadMiddleware = require('../../middleware/uploadImage');

const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

// Get All User Information. This is Only for Admin User
router.get("/info/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.Auth.findById(id, { password: 0 });
        if (user) {
            const obj = user;
            if (user.countryCode != undefined && user.phone != undefined) {
                obj.countryCode = 91;
                obj.phone = `+${user.countryCode}-${user.phone}`;
            }

            res.json({
                success: true,
                data: obj
            });
        }
    } catch (error) {
        res.send(error);
    }
});
/**
{
    "username": "Swarup7",
    "password": "Swarup@123"
}
 */
router.post("/login", async (req, res) => {
    try {
        const obj = {
            email: req.body.email,
            password: req.body.password,
            status: true
        };

        const user = await User.Auth.findOne(obj);
        if (user == null) {
            res.status(401).json({ error: "Username & password is not Valid" });
        } else {
            const obj = { id: user._id, email: user.email };
            const token = jwt.sign(obj, process.env.SECRATE_KEY, {
                expiresIn: 1800 // expires in 30 minuit
            });

            res.json({
                id: user._id,
                email: user.email,
                lname: user.lname,
                fname: user.fname,
                token: token
            });
        }
    } catch (error) {
        res.send(error);
    }
});


// Create New User 
/**
 * {
        "role": "Admin",
        "username": "Swarup7",
        "password": "Swarup@123",
        "email": "swarup.saha004@hotmail.com",
        "countryCode": 91
        "phone": 9035845781
 * }
 */
router.post("/signup", userMiddleware.checkExestingUser, async (req, res) => {
    try {
        const model = new User.Auth(req.body);
        const user = await model.save();
        const obj = { id: user._id, email: user.email };
        const token = jwt.sign(obj, process.env.SECRATE_KEY, {
            expiresIn: 1800 // expires in 30 minuit
        });

        res.send({
            id: user._id,
            email: user.email,
            token: token
        });
    } catch (error) {
        res.send(error);
    }
});

router.put("/addUsername/:id", userMiddleware.checkExestingUsername, async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.Auth.findOneAndUpdate({ _id: id }, { username: req.body.username }, {
            timestamps: { createdAt: false, updatedAt: true }
        });

        if (user) {
            res.json({
                success: true,
                data: user
            });
        }
    } catch (error) {
        res.send(error);
    }
});

router.put("/addUserInfo/:id", userMiddleware.varifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.Auth.findOneAndUpdate({ _id: id }, req.body, {
            timestamps: { createdAt: false, updatedAt: true }
        });

        if (user) {
            res.json({
                success: true,
                data: user
            });
        }
    } catch (error) {
        res.send(error);
    }
});

//Change Password
router.post('/changePassword', userMiddleware.varifyToken, async (req, res) => {
    try {
        const userId = req.body.id;
        const password = req.body.password;
        const user = await User.Auth.findById(userId);

        if (user.length > 0) {
            const obj = { _id: userId };
            const user = await User.Auth.findOneAndUpdate(obj, { password: password }, {
                timestamps: { createdAt: false, updatedAt: true }
            });

            res.json({
                success: true,
                data: user
            });
        } else {
            res.status(404).send("User id not found");
        }
    } catch (error) {
        res.send(error);
    }
});


// Active Previous Deactivated User. & Deactivate Active User.
router.put("/activeDeactivateUser/:id", (req, res) => {
    const id = req.params.id;
    const status = req.body;
    User.Auth.findById(id, (err, user) => {
        if (err) {
            res.json({
                error: err,
                message: "Id is not correct"
            });
        } else {
            if (user == null) {
                res.status(404).send("User id not found");
            } else {
                User.Auth.findOneAndUpdate({ _id: id }, status, {
                    timestamps: { createdAt: false, updatedAt: true }
                }, (err, data) => {
                    if (err) {
                        res.send(err);
                    } else {
                        if (req.body.status == false) {
                            res.status(200).json({
                                status: 'succes',
                                data: "User is Deactivated",
                            });
                        }
                        res.status(200).json({
                            status: 'succes',
                            data: "User is Activated",
                        });
                    }
                });
            }
        }
    });
});


/**
 * Varify Phone
 *  */
function getUserId(req, res, next) {
    const type = req.params.type;
    const data = req.params.data;
    User.Auth.findOne({}, (err, user) => {
        if (err) {
            res.send(err);
        } else {
            if (!user) {
                res.status(404).send("No User Found");
            } else {
                req.body.id = user._id;
                next();
            }
        }
    })
}


// router.get("/generateVarificationCode/:type/:data", getUserId, userMiddleware.getUserInfo, (req, res) => {
//     const type = req.params.type;      // For Mail & Send Message
//     const id = req.params.id;
//     const securityCode = userMiddleware.generateSecurityCode();
//     const securityCodeText = "Varification Code is " + securityCode;
//     const securityCodeTemplate = "<h1>Email varification code is " + securityCode + "</h1>";
//     User.Auth.findOneAndUpdate({ _id: id }, { securityCode: securityCode }, {
//         timestamps: { createdAt: false, updatedAt: true }
//     }, (err, user) => {
//         if (err) {
//             res.send(err);
//         } else {
//             // For Mail & Send Message
//             if (type == 'email') {
//                 email(user.email, 'Security Code', securityCodeTemplate, securityCodeText).then(data => {
//                     res.send(data);
//                 }, err => {
//                     console.log(err);
//                     res.send(err);
//                 });
//             } else {
//                 res.send(securityCode);
//             }
//         }
//     })
// });

router.put("/varification/:type/:id", userMiddleware.varifyToken, (req, res) => {
    const obj = {};
    const id = req.params.id;
    const type = req.params.type;
    const securityCode = req.body.securityCode;

    if (type == "email") {
        obj.emailVerified = 1;
    } else {
        obj.phoneVerified = 1;
    }

    User.Auth.findById(id, { securityCode: 1 }, (err, code) => {
        if (err) {
            res.send(err);
        } else {
            if (code.securityCode == securityCode) {
                User.Auth.findByIdAndUpdate(id, obj, (err, data) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(`Users ${type} has varified`);
                    }
                });
            } else {
                res.send(`Users ${type} has not varified. Because you have entered wrong Security Code`);
            }
        }
    });
});

/**
 * Insert User Details
 *  */
// Insert Logged in User Details
router.post("/insertUserDetails", userMiddleware.varifyToken, async (req, res) => {
    try {
        const model = new User.Details(req.body);
        const user = await model.save();
        if (user) {
            res.json({
                success: true,
                message: 'User details has addded'
            });
        }
    } catch (error) {
        res.send(error);
    }
});

// Get Logged in User Details
router.get("/userDetails/:id", userMiddleware.varifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.Details.findOne({ userId: id });
        if (user) {
            res.json({
                success: true,
                data: user
            });
        }
    } catch (error) {
        res.send(error);
    }
});

// Update User Details
router.put("/updateUserDetails/:id", userMiddleware.varifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const obj = req.body;
        const user = await User.Details.findOneAndUpdate({ userId: id }, obj, {
            timestamps: { createdAt: false, updatedAt: true }
        });

        if (user) {
            res.json({
                success: true,
                message: "Data Updated Successfully"
            });
        }
    } catch (error) {
        res.send(error);
    }
});


// router.post('/uploadProfilePics/:id', userMiddleware.varifyToken, upload.single("profile"), uploadMiddleware.uploadImage, (req, res) => {
//     let obj = {
//         userId: req.params.id,
//         profilePics: req.file.originalname
//     }
//     let model = new user.ProfilePics(obj);
//     model.save((err, profile) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.json('Profile picture uploaded successfully');
//         }
//     });
// });

module.exports = router;