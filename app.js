const express = require('express');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost:27017/BackendDB', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

const UserModel = mongoose.model('User', {
    username: String,
    email: String,
    dateOfBirth: String,
    country: String
});

app.get('/users', (req, res) => {
    UserModel.find({}, (err, docs) => {
        console.log(err);
        res.json(docs);
    });
});

app.get('/users/find/:id', (req, res) => {
    const user = users.find(user => user.id == req.params.id);

    if (!user) {
        res.json({ error: 'A user with the given ID was not found.'});
    } else {
        res.json(user);
    }
});

app.get('/users/create', (req, res) => {
    const user = new User(5, 'username5', 'email5@gmail.com', '1990-08-08', 'Kosova');
    users.push(user);

    res.json(user);
});

const port = 8080;

app.listen(port, () => {
    console.log(`Listening for on port ${port}.`);
});