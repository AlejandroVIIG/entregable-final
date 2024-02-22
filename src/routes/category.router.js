const { findAll, create, remove } = require('../controllers/category.controller');
const express = require('express');
const verifyJWT = require("../utils/verifyJWT");

const routerCategory = express.Router();

routerCategory.route('/')
    .get(findAll)
    .post(verifyJWT, create);

routerCategory.route('/:id')
    .delete(verifyJWT, remove)

module.exports = routerCategory;