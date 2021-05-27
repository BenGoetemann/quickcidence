const express = require('express');
var hbs = require('hbs');
const path = require('path');
const {covidRequest, filteredCovidRequest} = require('../utils/covid');
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
        title: "Quickcidence",
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
        if(error) {
            return res.send({
                title: "Something went wrong..."
            })
        }
        res.send({
            city: data.city,
            county: data.county,
            incidence: data.incidence
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

    if(port === 3000) {
        console.log(chalk.yellow.inverse('http://localhost:' + port + '/'))
    }
    
})
