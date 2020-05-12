const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/users', (req, res) => {
    let find = {};

    if ('username' in req.query) {
        find.username =  new RegExp("^"+ req.query.username);
    }

    User.find(find, (err, docs) => {
        if (err) {
            return res.json({ error: 'An error has occured.' });
        }

        res.json(docs);
    });
});

router.post('/users', (req, res) => {
    const { username, email, dateOfBirth, country } = req.body;
    const errors = {};

    if (!username) {
        errors.username = 'Username is required.';
    }

    if (!email) {
        errors.email = 'Email is required.';
    }

    if (!dateOfBirth) {
        errors.dateOfBirth = 'Date of birth is required.';
    }

    if (!country) {
        errors.country = 'Country is required.';
    }

    if (Object.keys(errors).length !== 0 && errors.constructor === Object) {
        res.json({ errors });
    }

    const user = new User({ username, email, dateOfBirth, country });

    user.save((err, user) => {
        if (err) {
            throw err;
        }
        
        res.json(user);
    });
});

router.get('/users/:id', (req, res) => {
    User.findById(req.params.id, (err, doc) => {
        if (err) {
            return res.json({ error: 'An error has occured.' });
        }

        if (!doc) {
            return res.json({ error: 'A user with the given ID was not found.' });
        }

        res.json(doc);
    });
});

module.exports = router;