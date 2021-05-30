const express = require('express');
var hbs = require('hbs');
const path = require('path');
const { covidRequest, filteredCovidRequest, emergencyBrake } = require('../utils/covid');
const chalk = require('chalk');

const app = express();
const port = process.env.PORT || 3000

// setting up paths
const publicDirectoryPath = path.join(__dirname, '../public');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')

// hbs config
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

// setting up serving static assets
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: "Quickcidence.com",
    });
})

app.get('/covid', (req, res) => {

    covidRequest((error, data) => {

        if (error) {
            return res.send({
                title: "Something went wrong..."
            })
        }
        res.send(data)
    }
    )
})

app.get('/covid/request', (req, res) => {

    filteredCovidRequest(req.query.location, (error, data) => {

        if (error) {
            return res.send({
                title: "Something went wrong..."
            })
        }


        let cityRequest = {
            city: data.city,
            county: data.county,
            incidence: data.incidence,
            state: data.state,
        }

        emergencyBrake(req.query.location, (error, data) => {
            let a = cityRequest;

            res.send({
                city: a.city,
                county: a.county,
                incidence: a.incidence,
                state: a.state,
                chilled: data
            })

        })


    })

})

app.get('/emergencyBrake', (req, res) => {

    if (!req.query.location) {
        return res.send({
            title: "Please provide a location."
        })
    }

    emergencyBrake(req.query.location, (error, data) => {
        res.send({
            city: req.query.location,
            title: "Inzidenz die letzten 5 Tage unter 100?",
            return: data
        })
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
    });
})

app.listen(port, () => {
    console.log(chalk.cyan('App ist listening on port ' + port))

    if (port === 3000) {
        console.log(chalk.yellow.inverse('http://localhost:' + port + '/'))
    }

})
