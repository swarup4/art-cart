require('dotenv').config();

const express = require('express');
const jwt = require("jsonwebtoken");
const multer = require('multer');

const User = require('./models');
const config = require('../../helper/config');
const userMiddleware = require('../../middleware/user');
// const email = require('../../middleware/email');
// const sendSMS = require('../../middleware/sendSMS');
// const phone = require('../../middleware/sendSMS');
// const uploadMiddleware = require('../../middleware/uploadImage');

const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

// Get All User Information. This is Only for Admin User
router.get("/info/:id", (req, res) => {
    const id = req.params.id;
    User.Auth.findById(id, { password: 0 }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            let obj = data;
            if (data.countryCode != undefined && data.phone != undefined) {
                obj.countryCode = 91;
                obj.phone = `+${data.countryCode}-${data.phone}`;
            }
            res.send(obj);
        }
    });
});
/**
{
    "username": "Swarup7",
    "password": "Swarup@123"
}
 */
router.post("/login", async (req, res) => {
    let obj = {
        email: req.body.email,
        password: req.body.password,
        status: true
    };

    try {
        let user = await User.Auth.findOne(obj);
        if (user == null) {
            res.status(401).json({ error: "Username & password is not Valid" });
        } else {
            let obj = { id: user._id, email: user.email };
            let token = jwt.sign(obj, process.env.SECRATE_KEY, {
                expiresIn: 1800 // expires in 30 minuit
            });

            res.json({
                id: user._id,
                email: user.email,
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
        let model = new User.Auth(req.body);
        let user = await model.save();
        let obj = { id: user._id, email: user.email };
        let token = jwt.sign(obj, process.env.SECRATE_KEY, {
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

router.put("/addUsername/:id", userMiddleware.checkExestingUsername, (req, res) => {
    let id = req.params.id;
    User.Auth.findOneAndUpdate({ _id: id }, { username: req.body.username }, {
        timestamps: { createdAt: false, updatedAt: true }
    }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.json(data);
        }
    });
});

router.put("/addUserInfo/:id", userMiddleware.varifyToken, (req, res) => {
    let id = req.params.id;
    User.Auth.findOneAndUpdate({ _id: id }, req.body, {
        timestamps: { createdAt: false, updatedAt: true }
    }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.json(data);
        }
    });
});

//Change Password
router.post('/changePassword', userMiddleware.varifyToken, (req, res) => {
    const userId = req.body.id;
    const password = req.body.password;
    if (req.body.olDpassword != undefined) {
        const oldPassword = req.body.olDpassword;
    }

    User.Auth.find(userId, (err, user) => {
        if (err) {
            res.json({
                error: err,
                message: "Id is not correct"
            });
        } else {
            if (user == null) {
                res.status(404).send("User id not found");
            } else {
                let obj = { _id: userId }
                User.Auth.findOneAndUpdate(obj, { password: password }, {
                    timestamps: { createdAt: false, updatedAt: true }
                }, (err, data) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send("Password updated succesfully");
                    }
                });
            }
        }
    });
});


// Active Previous Deactivated User. & Deactivate Active User.
router.put("/activeDeactivateUser/:id", (req, res) => {
    let id = req.params.id;
    let status = req.body;
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
        let model = new User.Details(req.body);
        let user = await model.save();
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
router.get("/userDetails/:id", userMiddleware.varifyToken, (req, res) => {
    let id = req.params.id;
    User.Details.findOne({ userId: id }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.json(data);
        }
    });
});

// Update User Details
router.put("/updateUserDetails/:id", userMiddleware.varifyToken, (req, res) => {
    const id = req.params.id;
    const obj = req.body;
    User.Details.findOneAndUpdate({ userId: id }, obj, {
        timestamps: { createdAt: false, updatedAt: true }
    }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send("Data Updated Successfully");
        }
    });
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