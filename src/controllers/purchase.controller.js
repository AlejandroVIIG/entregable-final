const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Category = require('../models/Category');
const ProductImg = require('../models/productImg');

const findAll = catchError(async(req, res) => {
    const {id: userId} = req.user;
    const purchases = await Purchase.findAll({
        where: {
            userId
        },
        include: [
            {
                model: Product,
                attributes: {
                    exclude: ["id","createdAt", "updatedAt"]
                },
                include: [{
                    model: Category,
                    attributes: ["id", "name"]
                },
                ProductImg
                ]
            }
        ]
    });
    return res.json(purchases);
});

const create = catchError(async (req, res) => {
    const {id: userId} = req.user;
    const carts = await Cart.findAll({
        where:{userId},
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        },
        // raw: true -> this returns plain javascript objects instead of model instances
    });
    if(!carts) return res.sendStatus(404);

    const newPurchase = await Purchase.bulkCreate(
        carts.map(cart => ({
            quantity: cart.quantity,
            userId: cart.userId,
            productId: cart.productId
            })
        ));
    if(!newPurchase) return res.sendStatus(404);
    
    for (const cart of carts) {
        await cart.destroy();
    }

    return res.status(201).json(newPurchase);
});

module.exports = {
    findAll,
    create
}