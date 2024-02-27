const catchError = require('../utils/catchError');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');
const Category = require('../models/Category');

const findAll = catchError(async(req, res) => {
    const {id: userId} = req.user;
    const carts = await Cart.findAll({
        include:[
            {
                model: Product,
                attributes: {
                    exclude: ["id", "updatedAt", "createdAt"],
                },
                include: [{
                    model: Category,
                    attributes: ["name"]
                }]
            },
            {
                model: User,
                attributes: {
                    exclude: ["id", "password", "updatedAt", "createdAt"]
                }
            }
        ],
        where: {userId},
        attributes: {
            exclude: ["updatedAt", "createdAt"]
        }
    });
    return res.json(carts);
});

const findOne = catchError(async(req, res) => {
    const {id: userId} = req.user;
    const {id} = req.params;
    const carts = await Cart.findByPk(id,
    {
        where: {userId},
        attributes: {
            exclude: ["updatedAt", "createdAt"]
        },
        include:[
            {
                model: Product,
                attributes: {
                    exclude: ["id", "updatedAt", "createdAt"],
                },
                include: [{
                    model: Category,
                    attributes: ["name"]
                }]
            },
            {
                model: User,
                attributes: {
                    exclude: ["id", "password", "updatedAt", "createdAt"]
                }
            }
        ]
    });
    return res.json(carts);
});

const create = catchError(async(req, res) => {
    const {id: userId} = req.user;
    const {quantity, productId} = req.body
    const cartToCreate = {quantity, productId, userId};
    const newCart = await Cart.create(cartToCreate);
    return res.status(201).json(newCart);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const {id: userId} = req.user;
    
    const cart = await Cart.findOne({
        where:{
            id,
            userId
        }
    });

    if(!cart) return res.sendStatus(404);
    await cart.destroy();
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const {id: userId} = req.user;
    const cart = await Cart.findByPk({
        where:{
            id,
            userId
        }
    });
    if(!cart) return res.sendStatus(404);
    const {quantity} = req.body;
    const updatedCart = await cart.update(quantity);
    return res.json(updatedCart);
});

module.exports = {
    findAll,
    findOne,
    create,
    remove,
    update
}