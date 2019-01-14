const functions = require('firebase-functions');
const express = require('express');
const path = require('path');

const app = express();

const indexRouter = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'routes')));
app.use('/', indexRouter);

exports.app = functions.https.onRequest(app);
