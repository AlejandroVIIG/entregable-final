const { findAll, create, remove, update, login } = require('../controllers/user.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const routerUser = express.Router();

routerUser.route('/')
    .get(verifyJWT, findAll)
    .post(create);

routerUser.route('/login')
          .post(login);

routerUser.route('/:id')
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = routerUser;