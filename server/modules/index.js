const express = require('express');
const app = express();

const user = require('./user/controller');
const order = require('./order/controller');
const product = require('./product/controller');
const review = require('./review/controller');
const uom = require('./uom/controller');
const wishlist = require('./wishlist/controller');
const bankDetail = require('./bankDetails/controller');
const wallet = require('./wallet/controller');

app.use('/user', user);
app.use('/order', order);
app.use('/product', product);
app.use('/review', review);
app.use('/uom', uom);
app.use('/wishlist', wishlist);
app.use('/bankDetails', bankDetail);
app.use('/wallet', wallet);

module.exports = app;