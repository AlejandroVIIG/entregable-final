const { findAll, create } = require('../controllers/purchase.controller');
const express = require('express');

const routerPurchase = express.Router();

routerPurchase.route('/')
    .get(findAll)
    .post(create)

module.exports = routerPurchase;