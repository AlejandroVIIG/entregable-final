require('./User');
const Cart = require('./Cart');
const Category = require('./Category');
const Product = require('./Product');
const User = require('./User');

// product.categoryId
Product.belongsTo(Category);
Category.hasMany(Product);

// cart.userId
Cart.belongsTo(User);
User.hasMany(Cart);

Cart.belongsTo(Product);
Product.hasMany(Cart);
