// let date = new Date();
// const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
// let currentDate = date.toLocaleDateString('de-DE', options)

//Restrictions
//mask.style.display = "flex";

//Relaxations

const bw = (data) => {

  infoBox.style.display = "flex";

  if (data.incidence >= 100 && !data.isUnder100) // Bundesnotbremse greift
  
    {
      paragraphB.style.color = "red"
      paragraphC.innerText = "Bundesnotbremse greift"
    } 
  
  else if (data.incidence >= 100 && data.isUnder100) // Bundesnotbremse greift noch nicht
  
    {
      paragraphB.style.color = "red"
      paragraphC.innerText = "Bundesnotbremse greift noch nicht"
    } 
  
  else if (data.isUnder100) // Bundesnotbremse greift nicht mehr
  
    {

      if (data.incidence < 100 && data.incidence >= 50) { // BW 50er Marke noch greift noch nicht
        paragraphB.style.color = "orange";
        paragraphC.innerText = "Lockerungen bei Inzidenz unter 50 greifen noch nicht"

      } else if (data.incidence < 50 && !data.isUnder50) { // BW 50er Marke noch greift noch nicht
        paragraphB.style.color = "orange";
        paragraphC.innerText = "Lockerungen bei Inzidenz unter 50 greifen noch nicht"

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