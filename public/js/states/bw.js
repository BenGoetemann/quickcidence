const bw = (data) => {

    if (data.incidence >= 100) {
      paragraphB.style.color = "red";
  
      //Restrictions
      mask.style.display = "flex";
      distance.style.display = "flex";
  
      //Relaxations
  
    } else if (data.incidence < 100 && data.incidence > 35) {
      paragraphB.style.color = "orange";
  
      //Restrictions
      mask.style.display = "flex";
      distance.style.display = "flex";
  
      //Relaxations
      restaurant.style.display = "flex";
  
    } else {
      paragraphB.style.color = "green";
  
      //Restrictions
      mask.style.display = "flex";
  
      //Relaxations
      restaurant.style.display = "flex";
      art.style.display = "flex";
  
    }
  
    paragraphA.innerText = data.city;
    paragraphB.innerText = Math.round(data.incidence);
  }