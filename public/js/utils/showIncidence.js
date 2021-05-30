const showIncidence = (data) => {

    if (!data.incidence) {

        paragraphB.style.color = "red";

        paragraphA.innerText = data.city;
        paragraphB.innerText = data.title;

    }

    else {

        if (data.incidence >= 100) {
            paragraphB.style.color = "red";
        } else if (data.incidence < 100 && data.incidence > 35) {
            paragraphB.style.color = "orange";
        } else {
            paragraphB.style.color = "green";
        }

        paragraphA.innerText = data.city;
        paragraphB.innerText = Math.round(data.incidence);

        switch (data.state) {
            case "Baden-Württemberg":
                console.log("Baden-Württemberg")
                bw(data);
                break;

            case "Bayern":
                console.log("Bayern")
                break;

            case "Berlin":
                berlin(data)
                break;

            case "Brandenburg":
                console.log("Brandenburg")
                break;

            case "Bremen":
                console.log("Bremen")
                break;

            case "Hamburg":
                console.log("Hamburg")
                break;

            case "Hessen":
                console.log("Hessen")
                break;

            case "Mecklenburg-Vorpommern":
                console.log("Mecklenburg-Vorpommern")
                break;

            case "Niedersachsen":
                console.log("Niedersachsen")
                break;

            case "Nordrhein-Westfalen":
                console.log("Nordrhein-Westfalen")
                break;

            case "Rheinland-Pfalz":
                console.log("Rheinland-Pfalz")
                break;

            case "Saarland":
                console.log("Saarland")
                break;

            case "Sachsen":
                console.log("Sachsen")
                break;

            case "Sachsen-Anhalt":
                console.log("Sachsen-Anhalt");
                break;

            case "Schleswig-Holstein":
                console.log("Schleswig-Holstein")
                break;

            case "Thüringen":
                console.log("Thüringen")
                break;

            default:
                console.log("no state provided")
                break;
        }

        relaxations.innerText = 'Relaxations';
        restrictions.innerText = 'Restrictions';

    }

}
