const express = require('express');
const app = express();

function User(id, username, email, dateOfBirth, country) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.country = country;
};

const users = [
    new User(1, 'username1', 'email1@gmail.com', '1990-05-05', 'Kosova'),
    new User(2, 'username2', 'email2@gmail.com', '1992-06-06', 'USA'),
    new User(3, 'username3', 'email3@gmail.com', '1993-07-07', 'Germany'),
    new User(4, 'username4', 'email4@gmail.com', '1999-08-08', 'Spain')
];

// http://mywesbsite.com/users => Retrun all users
// http://mywesbsite.com/users/{id} => Retrun user with id {id}

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    let user;
    for (let i = 0; i < users.length; i++) {
        console.log(users[i].id, id)
        if (users[i].id == id) {
            user = users[i];
        }
    }
    if (!user) {
        res.json({ error: 'A user with the given ID was not found.'});
    } else {
        res.json(user);
    }
});

const port = 8080;

app.listen(port, () => {
    console.log(`Listening for on port ${port}.`);
});