const { findAll, create, remove, update, findOne } = require('../controllers/cart.controller');
const express = require('express');

const routerCart = express.Router();

routerCart.route('/')
    .get(findAll)
    .post(create);

routerCart.route('/:id')
    .get(findOne)
    .delete(remove)
    .put(update);

module.exports = routerCart;