const request = require('request');

const emergencyBrake = (city, callback) => {

    const url = 'https://api.corona-zahlen.org/districts/history/incidence/5'

    request({ uri: url, json: true }, (error, response) => {

        if (error) {
            callback(error, undefined)
        } else {
            const values = Object.values(response.body.data)

            // console.log(values)

            let incidenceValues = [];
            let success;

            values.forEach(a => {
                if (a.name === city) {
                    success++
                    a.history.forEach(b => {

                        if (b.weekIncidence >= 100) {
                            incidenceValues.push(1)
                        } else {
                            incidenceValues.push(0)
                        }
                    })

                }
            })

            const isIncidencesStable = incidenceValues.find(element => element === 1);

            let result;

            if (isIncidencesStable === 1) {
                result = false
            } else {
                result = true
            }


            callback(undefined, result)
        }
    })

}

const covidRequest = (callback) => {

    const url = 'https://api.corona-zahlen.org/districts'

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
                    incidence: e.weekIncidence,
                    state: e.state
                });
            })
            callback(undefined, filteredCovidData)
        }
    })

}

const filteredCovidRequest = (city, callback) => {

    const url = 'https://quickcidence.herokuapp.com/covid'
    const url2 = 'http://localhost:3000/emergencyBrake?location=' + city

    request({ uri: url, json: true }, (error, response) => {

        const test = response.body
        let choose = [];
        let success = 0;

        if (error) {
            callback(error, undefined);
        } else {
            test.forEach(a => {
                if (city === a.city) {

                    success++;
                    
                    choose.push({
                        city: a.city,
                        county: a.county,
                        incidence: a.incidence,
                        state: a.state,
                    })

                }
            })

            if (success >= 1) {
                callback(undefined, choose[0])
            } else {
                callback(error, undefined)
            }
        }

    })
}

module.exports = {
    covidRequest: covidRequest,
    filteredCovidRequest: filteredCovidRequest,
    emergencyBrake: emergencyBrake
}