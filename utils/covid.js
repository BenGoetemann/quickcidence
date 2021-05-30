const request = require('request');

const emergencyBrake = (city, callback) => {

    const url = 'https://api.corona-zahlen.org/districts/history/incidence/10'

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

            function check(array) {

                const arr = array;
                const a = arr[9]
                const b = arr[8]
                const c = arr[7]
                const d = arr[6]
                const e = arr[5]
                const f = arr[4]
                const g = arr[3]

                if (a === 1 && b === 1 && c === 1) {
                    return false
                } else if (b === 1 && c === 1 && d === 1){
                    return false
                } else if (c === 1 && d === 1 && e === 1){
                    return false
                } else if (d === 1 && e === 1 && f === 1) {
                    return false
                } else if (e === 1 && f === 1 && g === 1) {
                    return false
                } else {
                    return true
                }

            }

            console.log(incidenceValues)
            console.log(check(incidenceValues))
        
            const isIncidencesStable = check(incidenceValues);

            callback(undefined, isIncidencesStable)
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