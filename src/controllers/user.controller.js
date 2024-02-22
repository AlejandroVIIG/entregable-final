const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const findAll = catchError(async(req, res) => {
    const users = await User.findAll();
    return res.json(users);
});

const create = catchError(async(req, res) => {
    const newUser = await User.create(req.body);
    return res.status(201).json(newUser);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
     if(!user) return res.sendStatus(404);
    await user.destroy();
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;

    delete req.body.email;
    delete req.body.password;

    if(Object.keys(req.body).length === 0) return res.sendStatus(404);
    const user = await User.findByPk(id);
    if(!user) return res.sendStatus(404);
    const updatedUser = await user.update(req.body);
    return res.json(updatedUser);
});

const login = catchError(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({where: {email}});
    if(!user) return res.sendStatus(401).json({error: "Invalid credentials"});
/*
    const passIsValid = await bcrypt.compare(password, user.password);
    if(!passIsValid) return res.sendStatus(401).json({error: "Invalid credentials"});]*/

    const token = jwt.sign(
        {user},
        process.env.SECRET_TOKEN,
        {expiresIn: "1d"}
    );

    return res.json({user, token});
});

module.exports = {
    findAll,
    create,
    remove,
    update,
    login
}