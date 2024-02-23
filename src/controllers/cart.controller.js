const catchError = require('../utils/catchError');
const Cart = require('../models/Cart');

const findAll = catchError(async(req, res) => {
    const carts = await Cart.findAll();
    return res.json(carts);
});

const create = catchError(async(req, res) => {
    const {userId} = req.user.id;
    const newCart = await Cart.create(req.body);
    return res.status(201).json(newCart);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const cart = await Cart.findByPk(id);
     if(!cart) return res.sendStatus(404);
    await cart.destroy();
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const cart = await Cart.findByPk(id);
    if(!cart) return res.sendStatus(404);
    const updatedCart = await cart.update(req.body);
    return res.json(updatedCart);
});

module.exports = {
    findAll,
    create,
    remove,
    update
}