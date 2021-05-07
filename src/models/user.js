const { model } = require('mongoose');

module.exports = model('users', {
    id: String,
    profession: String,
    description: String,
    money: Number,
    portfolio: String,
    stars: Number
});