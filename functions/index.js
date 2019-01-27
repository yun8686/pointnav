const functions = require('firebase-functions');
const express = require('express');
const path = require('path');

const app = express();

const indexRouter = require('./routes/index');
const lowsonRouter = require('./routes/lowson');
const sevenRouter = require('./routes/sevenEleven');
const famimaRouter = require('./routes/famima');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/lowson', lowsonRouter);
app.use('/seven', sevenRouter);
app.use('/famima', famimaRouter);



exports.app = functions.https.onRequest(app);
