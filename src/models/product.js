const { model } = require('mongoose');

module.exports = model('products', {
    id: Number,
    title: String,
    description: String,
    price: Number,
    discount: Number,
    imgUrl: String,
    createdAt: Date
});