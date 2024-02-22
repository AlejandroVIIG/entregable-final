const { findAll, create, findOne, remove, update } = require('../controllers/product.controller');
const express = require('express');

const routerProduct = express.Router();

routerProduct.route('/')
    .get(findAll)
    .post(create);

routerProduct.route('/:id')
    .get(findOne)
    .delete(remove)
    .put(update);

module.exports = routerProduct;