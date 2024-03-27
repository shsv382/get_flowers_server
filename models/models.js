const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    phone: {type: DataTypes.INTEGER, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Cart = sequelize.define('cart', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    order_date: {type: DataTypes.DATE},
    total_amount: {type: DataTypes.INTEGER}
})

const Order_detail = sequelize.define('order_detail', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER},
    unit_price: {type: DataTypes.FLOAT},
    subtotal_amount: {type: DataTypes.FLOAT}
})

const Payment = sequelize.define('payment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    payment_date: {type: DataTypes.DATE},
    payment_method: {type: DataTypes.STRING}
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    price: {type: DataTypes.FLOAT},
    stock_quantity: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
})

const Cart_product = sequelize.define('cart_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Favorites = sequelize.define('favorites', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

Order.hasMany(Order_detail);
Order_detail.belongsTo(Order);

Product.hasMany(Order_detail);
Order_detail.belongsTo(Product);

Category.hasMany(Product);
Product.belongsTo(Category);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, {through: Cart_product});
Product.belongsToMany(Cart, {through: Cart_product});

User.belongsToMany(Product, {through: Favorites});
Product.belongsToMany(User, {through: Favorites});

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(Payment);
Payment.belongsTo(Order);

module.exports = {
    User, 
    Cart, 
    Order, 
    Order_detail, 
    Payment, 
    Product, 
    Category, 
    Cart_product
}