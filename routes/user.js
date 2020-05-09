const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/users', (req, res) => {
    User.find({}, (err, docs) => {
        if (err) {
            return res.json({ error: 'An error has occured.' });
        }

        res.json(docs);
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