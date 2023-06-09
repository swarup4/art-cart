const express = require('express');

const BankDetails = require('./models');

const router = express.Router();

router.get('/getAllVendors', async (req, res) => {
    try {
        const bank = await BankDetails.find({ bankUserType: 'Vendor' });
        if (bank) {
            res.json({
                success: true,
                data: bank
            });
        }
    } catch (error) {
        res.send(error);
    }
});


/* 
{
    "bankUserId": "609ab05eabddac700c9e5420",
    "bankUserType": "Vendor",
    "accountName": "Swarup Saha",
    "accountNumber": 1002059312,
    "bankCode": 1000004,
    "bankName": "HDFC",
    "branchName": "1st Block, Koramangala",
    "IFSCCode": "HDFC000004",
    "currency": "INR",
    "accountType": "Savings",
    "city": "Bangalore",
    "state": "Karnataka",
    "country": "India",
    "pinCode": 560034,
}
*/
router.post('/addBankDetails', async (req, res) => {
    try {
        const model = new BankDetails(req.body);
        const bank = await model.save();
        if (bank) {
            res.json({
                success: true,
                message: 'Add Bank Details Data'
            });
        }
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;