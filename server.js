const express = require('express');
const twig = require('twig');

// Mongodb
const db = require('./lib/mongo');
// Client routing
const client = require('./client');
// API routing
const api = require('./api');



const app = express();

// App setting
app.set('views', './client/views/');
app.set('view engine', 'html');
// eslint-disable-next-line no-underscore-dangle
app.engine('html', twig.__express);

// Routers
app.use('/', client);
app.use('/api', api);

app.use('/static', express.static('public'));

app.listen(8080, () => {
    console.log('Conso App server is running !');
    // FIXME problème de connexion à mongo
    db.connect('mongodb://mongodb/td5', (err, data) => {
        if (err) {
            throw new Error(err);
        }
        console.log(data);
    });
});
