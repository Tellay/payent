const { model } = require('mongoose');

module.exports = model('channels', {
    id: String,
    channel: String,
    selling: Array,
});