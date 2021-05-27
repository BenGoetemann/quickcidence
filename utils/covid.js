const request = require('request');


const covidRequest = (callback) => {

    const url = 'https://api.corona-zahlen.org/districts'

    // if (user_input === 'Berlin') {
    //     user_input = 'Berlin Friedrichshain-Kreuzberg'
    // }

    request({ uri: url, json: true }, (error, response) => {

        if (error) {
            callback(error, undefined)
        } else {
            const values = Object.values(response.body.data)

            let filteredCovidData = [];

            values.forEach(e => {
                filteredCovidData.push({
                    city: e.name,
                    county: e.county,
                    incidence: e.weekIncidence
                });
            })
            callback(undefined, filteredCovidData)
        }
    })

}

const filteredCovidRequest = (city, callback) => {

    let user_input = city;
    const url = 'http://localhost:3000/covid'

    request({ uri: url, json: true }, (error, response) => {

        const test = response.body
        let choose = [];
        let success = 0;

        if (error) {
            callback(error, undefined);
        } else {
            test.forEach(a => {
                if (user_input === a.city) {
                    success++;
                    choose.push({
                        city: a.city,
                        county: a.county,
                        incidence: a.incidence
                    })
                }
            })

            if(success >= 1){
                callback(undefined, choose[0])
            } else {
                callback(error, undefined)
            }
        }

    })
}


module.exports = {
    covidRequest: covidRequest,
    filteredCovidRequest: filteredCovidRequest
}