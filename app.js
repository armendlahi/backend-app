const express = require('express');
const mongoose = require('mongoose');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));
mongoose.connect('mongodb://localhost:27017/BackendDB');

const userRoutes = require('./routes/user')

const app = express();
app.use(userRoutes);

const port = 8080;

app.listen(port, () => {
    console.log(`Listening for on port ${port}.`);
});