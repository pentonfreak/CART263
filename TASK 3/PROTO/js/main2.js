const card = document.getElementById("card");

// simple deck
const cards = ["♠", "♥", "♦", "♣"];
const numberOfCards = [1,2,3,4,5,6,7,8,9,10,"J","Q","K","A"];
let current = 0;
let cardColor = ["#ff0000", "#000000"];


/**
 * Space bar interaction to cycle through cards
*/

// show first card
card.textContent = cards[current];

windowKeyDownRef = function(event) {
  if (event.code === "Space") {   // space bar
    // change card
    let randomCard = cards[Math.floor(Math.random() * cards.length)];
    // change number
    let randomNumber = numberOfCards[Math.floor(Math.random() * numberOfCards.length)];
    // random combination
     card.textContent = randomCard + randomNumber;
    


    // random color
    let randomColor = cardColor[Math.floor(Math.random() * cardColor.length)];
    card.style.color = randomColor;


    // small feedback animation
    card.style.transform = "scale(1.1)";
    setTimeout(() => {
      card.style.transform = "scale(1)";
    }, 150);
  }
}

windowKeyUpRef = function(event) {
    if (event.code === "Space") {   // space bar
        console.log(card.textContent);
        }
}

window.addEventListener("keydown", windowKeyDownRef);
window.addEventListener("keyup", windowKeyUpRef);

