// let date = new Date();
// const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
// let currentDate = date.toLocaleDateString('de-DE', options)

//Restrictions
//mask.style.display = "flex";

//Relaxations

const bw = (data) => {

  console.log(data)

  const emergencyBrake = (data) => {
    brakeContacts.style.display = "flex";
    brakeCloseContactServices.style.display = "flex";
    brakeCurfew.style.display = "flex";
    brakeCulture.style.display = "flex";
    brakeSchool.style.display = "flex";
  }
  
  const defaultSigns = (data) => {
    mask.style.display = "flex";
    distance.style.display = "flex";
    groceries.style.display = "flex";
  }
  
  const signs100 = (data) => {

    const a = data.last10days

    if((a[9] && a[8] && a[7] && a[6] && a[5]) < 50) {
      clickAndMeet100.style.display = "flex"
      university100.style.display = "flex"
      fitness100.style.display = "flex"
      fandom100.style.display = "flex"
      religion100.style.display = "flex"
      culture100.style.display = "flex"
      freeTime100.style.display = "flex"
      
      restaurants100.style.display = "none"
      restaurants1002.style.display = "flex"
  
      tourism100.style.display = "flex"
      petcare100.style.display = "flex"
    }

    meet100.style.display = "flex";
    kita100.style.display = "flex";
    school100.style.display = "flex";
    danceSchool100.style.display = "flex";
    license100.style.display = "flex";
    closeContactServices100.style.display = "flex";
    restaurants100.style.display = "flex";
    diyMarket100.style.display = "flex"
  }


  defaultSigns(data)

  if (data.incidence >= 100 && !data.isUnder100) // Bundesnotbremse greift
  
    {
      paragraphB.style.color = "red"
      paragraphC.innerText = "Bundesnotbremse greift"

      brakeContacts.style.display = "flex";
      brakeCloseContactServices.style.display = "flex";

      emergencyBrake(data)

    } 
  
  else if (data.incidence >= 100 && data.isUnder100) // Bundesnotbremse greift noch nicht
  
    {
      paragraphB.style.color = "red"
      paragraphC.innerText = "Bundesnotbremse greift noch nicht"

      signs100(data)
    } 
  
  else if (data.isUnder100) // Bundesnotbremse greift nicht mehr
  
    {

      if (data.incidence < 100 && data.incidence >= 50) { // BW 50er Marke noch greift noch nicht
        paragraphB.style.color = "orange";
        paragraphC.innerText = "Lockerungen bei Inzidenz unter 50 greifen noch nicht"

      } else if (data.incidence < 50 && !data.isUnder50) { // BW 50er Marke noch greift noch nicht
        paragraphB.style.color = "orange";
        paragraphC.innerText = "Lockerungen bei Inzidenz unter 50 greifen noch nicht"

        signs100(data)
   

      } else { // // BW 50er Marke greift if (data.incidence < 50 && data.isUnder50)
        paragraphB.style.color = "green";
        paragraphC.innerText = "Lockerungen bei Inzidenz unter 50 greifen"

      } 

    } 
  
  else 
  
    {
      paragraphC.innerText = "Unbekannter Fehler"
    }

}

