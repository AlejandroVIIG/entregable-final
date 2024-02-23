const { findAll, create, findOne, remove, update } = require('../controllers/product.controller');
const express = require('express');
const verifyJWT = require("../utils/verifyJWT");

const routerProduct = express.Router();

routerProduct.route('/')
    .get(findAll)
    .post(verifyJWT, create);

routerProduct.route('/:id')
    .get(findOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = routerProduct;