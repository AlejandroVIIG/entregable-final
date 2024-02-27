const { findAll, create, remove } = require('../controllers/productImg.controller');
const express = require('express');
const upload = require('../utils/multer');

const routerProductImg = express.Router();

routerProductImg.route('/')
    .get(findAll)
    .post(upload.single('image'), create);

routerProductImg.route('/:id')
    .delete(remove);

module.exports = routerProductImg;