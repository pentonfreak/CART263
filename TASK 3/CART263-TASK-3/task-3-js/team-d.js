setup_D();
/** THEME: DECEPTION  */
function setup_D() {
  console.log("in d");
  /**************************************************** */
  //get the buttons
  activateButtons(`#TEAM_D`, "ani_canvD",aniA,aniB,aniC,aniD);

  /**************** ANI A ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN A INSIDE HERE */
  /**************** ANI A ************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:)
   * 1: create a creative, visual pattern using text, divs as shapes, images ...
   * 2: add in mouseclick event listener(s) somewhere to make the sketch interactive
   *
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function  -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/
   
  function aniA(parentCanvas) {
    console.log("in ani-A -teamD");
  }


  /****************ANI B ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN B INSIDE HERE */
  /****************ANI B ************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:).
   * 1: create a creatve, visual pattern using text, divs as shapes, images ... 
   * 2: add in mouseover event listener(s) somewhere to make the sketch interactive
   *
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

  function aniB(parentCanvas) {
      console.log("in ani-B -teamD");

      const grid = document.createElement("div");
      parentCanvas.appendChild(grid);
      grid.id = "grid";

/**
 * Pattern options:
 */

const patterns = ["+", "-", "*", "•", "×", "o"];

// const patterns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

// const patterns = ["\u25A0", "\u25A1", "\u25A2", "\u25A3", "\u25A4", "\u25A5"];

// const patterns = ["0", "1"]


/**
 * Color options:
 */

let sampleColors = ["#FF6B6B", "#6BCB77", "#4D96FF", "#FFD93D", "#FF6F91", "#845EC2"];

// let sampleColors = ["#02ff17", "#00b418"];

let boudingBoxParent = grid.getBoundingClientRect();
/**
 * Create grid
 */
for (let i = 0; i < 17; i++) {
  for (let j = 0; j < 17; j++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.textContent = patterns[Math.floor(Math.random() * patterns.length)];
  
  // random color as mouse hovers
  cell.addEventListener("mouseover", () => {
    const randomColor = sampleColors[Math.floor(Math.random() * sampleColors.length)];
    cell.style.color = randomColor;
  });

  // mouseover interaction
  cell.addEventListener("mouseover", () => {
    cell.classList.add("active");

    // remove effect after a moment
    setTimeout(() => {
      cell.classList.remove("active");
    }, 600);
  });

  grid.appendChild(cell);
  }
 
}

  }
  /****************ANI C ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN C INSIDE HERE */
  /****************ANI C************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:)
   * 1: use the PROVIDED keyup/down callbacks `windowKeyDownRef` and/or `windowKeyUpnRef` to handle keyboard events
   * 2: create an interactive pattern/sketch based on keyboard input. Anything goes.
   * 
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

  /* TASK: make an interactive pattern .. colors, shapes, sizes, text, images....
   * using  ONLY key down and/or keyup -- any keys::
   */

  function aniC(parentCanvas) {
      console.log("in ani-C -teamD");

const table = document.createElement("div");
      parentCanvas.appendChild(table);
      table.id = "table";

  const card = document.createElement("div");
      table.appendChild(card);
      card.id = "card";

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
  if (event.code === "Space") { // space bar
    event.preventDefault();
    
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


  }

  /****************ANI D************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN D INSIDE HERE */
  /****************ANI D************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:).
   * 1: create a creative, visual pattern using text, divs as shapes, images ...
   * 2: add in animation using requestAnimationFrame somewhere to make the sketch animate :)
   *
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/
   function aniD(parentCanvas) {
    console.log("in ani-D -teamD");
    }

}