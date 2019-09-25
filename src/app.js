const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, 'templates/views');
const partialsPath = path.join(__dirname, 'templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jesse Z'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Jesse Zahrt'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        text: 'This is some very helpful text!'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'address must be provided'
        })
    } else {
        geocode(req.query.address, (error, {location, latitude, longitude}  = {}) => {
            if (error) {
                return res.send({error})
            }
            forecast(latitude, longitude, (error, {forecastData}) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                    title: 'Weather',
                    forecast: forecastData,
                    location,
                    address: location
                })
            })
        });
    }
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        errorMessage: 'Help article not found'
    })
});

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        errorMessage: 'Page not found'
    })
});

app.listen(3000, () => {
    console.log('Server started on port 3000')
});
