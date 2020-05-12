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

        return res.json(docs);
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
        return res.json({ errors });
    }

    const user = new User({ username, email, dateOfBirth, country });

    user.save((err, user) => {
        if (err) {
            throw err;
        }
        
        return res.json(user);
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

        return res.json(doc);
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

        return res.json({ success: "User has been updated." });
    })
});

router.delete('/users/:id', (req, res) => {
    User.remove({ _id: req.params.id }, (err) => {
        if (err) {
            throw err;
        }

        return res.json({ success: 'User has been deleted.' });
    })
});

module.exports = router;