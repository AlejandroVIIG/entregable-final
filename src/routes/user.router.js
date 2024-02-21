const { findAll, create, remove, update, login } = require('../controllers/user.controller');
const express = require('express');
const verifyJwt = require('../utils/verifyJWT');

const routerUser = express.Router();

routerUser.route('/')
    .get(findAll)
    .post(create);

routerUser.route('/')
          .post(login);

routerUser.route('/:id')
    .delete(remove)
    .put(update);

module.exports = routerUser;