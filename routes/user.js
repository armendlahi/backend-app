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

router.get('/users/find/:id', (req, res) => {
    const user = users.find(user => user.id == req.params.id);

    if (!user) {
        res.json({ error: 'A user with the given ID was not found.'});
    } else {
        res.json(user);
    }
});

// router.get('/users/create', (req, res) => {
//     const user = new User(5, 'username5', 'email5@gmail.com', '1990-08-08', 'Kosova');
//     users.push(user);

//     res.json(user);
// });

module.exports = router;