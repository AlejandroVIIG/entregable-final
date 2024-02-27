const catchError = require('../utils/catchError');
const ProductImg = require('../models/productImg');
const path = require('path');
const fs = require("fs");
const Product = require('../models/Product');

const findAll = catchError(async (req, res) => {
    const productImgs = await ProductImg.findAll();
    return res.json(productImgs);
});

const create = catchError(async (req, res) => {
    const {filename} = req.file;
    console.log(filename);

    // req.protocols == http, req.headers.host == localhost:8080
    const url = `${req.protocol}://${req.headers.host}/uploads/${filename}`;

    const newImage = {filename, url};

    const newProductImg = await ProductImg.create(newImage);

    return res.status(201).json(newProductImg);
});

const remove = catchError(async (req, res) => {
    const {id} = req.params;
    const productImg = await ProductImg.findByPk(id);
    if(!productImg) return res.sendStatus(404);

    const imagePath = path.join(__dirname, "..", "public", "uploads", `${productImg.filename}`);

    fs.unlinkSync(imagePath);
    await productImg.destroy();

    return res.sendStatus(204);
});

module.exports = {
    findAll,
    create,
    remove
}