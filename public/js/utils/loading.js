const loading = () => {

    paragraphA.innerText = "loading..."
    paragraphB.innerText = ""
    relaxations.innerText = ""
    restrictions.innerText = ""

    cards.forEach(card => {
        card.style.display = "none"
    })

    infoBox.style.display = "none"

}