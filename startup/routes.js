const express = require('express');
const genre = require('../routes/genres');
const customer = require('../routes/customers');
const user = require('../routes/users');
const auth = require('../routes/auth');

module.exports = app => {
    app.use(express.json());

    app.use('/api/genres', genre);
    app.use('/api/customers', customer);
    app.use('/api/users', user);
    app.use('/api/auth', auth);
}