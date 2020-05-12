const express = require('express');
const router = express.Router();

const User = require('../models/User');
// Create Retrieve Update Delete
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

router.patch('/users/:id', (req, res) => {
    const { _id } = req.body;

    if (_id) {
        return res.json({ error: "Id cannot be changed." });
    }

    User.updateOne({ _id: req.params.id }, req.body, (err, doc) => {
        if (err) {
            throw err;
        }

        res.json({ data: "User has been updated." });
    })
});

module.exports = router;