const catchError = require('../utils/catchError');
const Category = require('../models/Category');

const findAll = catchError(async(req, res) => {
    const category = await Category.findAll();
    return res.json(category);
});

const create = catchError(async(req, res) => {
    const newCategory = await Category.create(req.body);
    return res.status(201).json(newCategory);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const category = await Category.findByPk(id);
     if(!category) return res.sendStatus(404);
    await category.destroy();
    return res.sendStatus(204);
});

module.exports = {
    findAll,
    create,
    remove
}