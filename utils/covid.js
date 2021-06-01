const request = require('request');

const emergencyBrake = (city, callback) => {

    const url = 'https://api.corona-zahlen.org/districts/history/incidence/10'

    request({ uri: url, json: true }, (error, response) => {

        if (error) {
            callback(error, undefined)
        } else {
            const values = Object.values(response.body.data)

            // console.log(values)

            let incidenceValues100 = [];
            let incidenceValues50 = [];
            let last10days = [];
            let success;

            values.forEach(a => {
                if (a.name === city) {
                    success++
                    a.history.forEach(b => {

                        last10days.push(Math.round(b.weekIncidence))

                        if (b.weekIncidence >= 100) {
                            incidenceValues100.push(1)
                        } else {
                            incidenceValues100.push(0)
                        } 
                        
                        if (b.weekIncidence >= 50) {
                            incidenceValues50.push(1) 
                        } else {
                            incidenceValues50.push(0)
                        }
                    })

                }
            })

            function check100(array) {

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

            function check50(array) {

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

            console.log("Under 100 " + incidenceValues100)
            console.log(check100(incidenceValues100))
            console.log("Under 50 " + incidenceValues50)
            console.log(check100(incidenceValues50))
            

            callback(undefined, {
            
                isUnder100: check100(incidenceValues100),
                isUnder50: check50(incidenceValues50),
                last10days: last10days

            })
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
    const url2 = 'https://quickcidence.herokuapp.com/emergencyBrake?location=' + city

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