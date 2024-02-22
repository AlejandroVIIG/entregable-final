const catchError = require('../utils/catchError');
const Product = require('../models/Product');

const findAll = catchError(async(req, res) => {
    const products = await Product.findAll();
    return res.json(products);
});

const create = catchError(async(req, res) => {
    const newProduct = await Product.create(req.body);
    return res.status(201).json(newProduct);
});

const findOne = catchError(async(req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if(!product) return res.sendStatus(404);
    return res.json(product);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
     if(!product) return res.sendStatus(404);
    await product.destroy();
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if(!product) return res.sendStatus(404);
    const updatedProduct = await product.update(req.body);
    return res.json(updatedProduct);
});

module.exports = {
    findAll,
    create,
    findOne,
    remove,
    update
}