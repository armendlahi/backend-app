const express = require('express');
const app = express();

const port = 8080;
// http://mywesbite.com/homepage
// http://mywesbite.com/users
// http://mywesbite.com/

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>');
});

app.get('/homepage', (req, res) => {
    res.send('You are in homepage.');
});

app.get('/users', (req, res) => {
    res.send('You are in users page.');
});

app.listen(port, () => {
    console.log(`Listenin for on port ${port}.`);
});