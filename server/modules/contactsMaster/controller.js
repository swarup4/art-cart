let express = require('express');
let router = express.Router();
let contactsMaster = require('./models');


// Vendors

//Get All Vendors Details
router.get('/vendors', (req, res) => {
    contactsMaster.Vendor.find((err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json({
                success: true,
                data: data
            });
        }
    });
});

//Add a new Vendor
router.post('/vendors/addDetails', (req, res) => {
    let model = new contactsMaster.Vendor(req.body);
    model.save((err, vendor) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json({
                success: true,
                message: 'Vendor Data added successfully',
                data: vendor
            });
        }
    });
});

//Update Vendors Data
router.put("/vendors/update/:id", (req, res) => { 
    let id = req.params.id;
    let body = req.body
    contactsMaster.Vendor.findOneAndUpdate({ _id: id }, body, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.json({
                success: true,
                message: 'Vendor Data updated successfully',
                data: data
            });
        }
    });
});


// Customers

//Get all customers
router.get('/customers', (req, res) => {
    contactsMaster.Customers.find((err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json({
                success: true,
                data: data
            });
        }
    });
});


//Add new Customer 
router.post('/customers/addDetails', (req, res) => {
    let model = new contactsMaster.Customers(req.body);
    model.save((err, customers) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json({
                success: true,
                message: 'Customer Data added successfully',
                data: customers
            });
        }
    });
});

//Update customer data
router.put('/customers/update/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    contactsMaster.Customers.findOneAndUpdate({ _id: id }, body, (err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json({
                success: true,
                message: 'Customer Data Updated successfully',
                data: data
            });
        }
    });
});


// Manufacturers

//Get All Manufacturers
router.get('/manufacturers', (req, res) => {
    contactsMaster.Manufacturers.find((err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json({
                success: true,
                data: data
            });
        }
    });
});

//Add a new Manufacturer
router.post('/manufacturers/addDetails', (req, res) => {
    let model = new contactsMaster.Manufacturers(req.body);
    model.save((err, manufacturers) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json({
                success: true,
                message: 'Created Manufacturers Data',
                data: manufacturers
            });
        }
    });
});

//Update manufacturers data
router.put('/manufactures/update/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    contactsMaster.Manufacturers.findOneAndUpdate({ _id: id }, body, (err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json({
                success: true,
                message: 'Manufacturers Data added successfully',
                data: data
            });
        }
    });
});

// Customer Group

//Get All Customers Group
router.get('/customerGroup', (req, res) => {
    contactsMaster.CustomerGroup.find((err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json({
                success: true,
                data: data
            });
        }
    });
});

//Add a new Customer Groups
router.post('/customerGroup/addDetails', (req, res) => {
    let model = new contactsMaster.CustomerGroup(req.body);
    model.save((err, manufacturers) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json({
                success: true,
                message: 'Created Customer Group',
                data: manufacturers
            });
        }
    });
});

//Update Customer Group
router.put('/customerGroup/update/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    contactsMaster.CustomerGroup.findOneAndUpdate({ _id: id }, body, (err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json({
                success: true,
                message: 'Customer Group Data added successfully',
                data: data
            });
        }
    });
});
module.exports = router;