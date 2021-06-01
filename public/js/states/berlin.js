const berlin = (data) => {

    if (data.incidence >= 100) {
        paragraphB.style.color = "red";

        //Restrictions

        //Relaxations

    } else if (data.chilled === true) { //wenn bundesnotbremse nicht mehr aktiv ist

        if (null) { // rules
            paragraphB.style.color = "orange";

            //Restrictions

            //Relaxations

        } else {
            paragraphB.style.color = "green";

            //Restrictions

            //Relaxations

        }

    } else {

    }
}

