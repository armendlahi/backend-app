const mongoose = require('mongoose');

const User = mongoose.model('User', {
    username: String,
    email: String,
    dateOfBirth: String,
    country: String
});

module.exports = User;