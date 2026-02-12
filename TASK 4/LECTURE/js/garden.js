window.onload = function (){
// Our garden
  let garden = {
    // An array to store the individual flowers
    flowers: [],
    // How many flowers in the garden
    numFlowers: 20,

    /*grass object */
    grass: {
      // The color of the grass (background)
      grassColor: {
        r: 120,
        g: 180,
        b: 120,
      },
      //the grass element
      grassDiv: document.createElement("div"),
    },

    /*sky object */
    sky: {
      // The color of the sky (background)
      skyColor: {
        r: 83,
        g: 154,
        b: 240,
      },
      //the sky element
      skyDiv: document.createElement("div"),
    },
  };

  function createAndRenderTheGarden() {
    /* note how we use dot notation....*/
    //sky
    garden.sky.skyDiv.classList.add("sky");
    garden.sky.skyDiv.style.background = `rgb(
        ${garden.sky.skyColor.r},
        ${garden.sky.skyColor.g},
        ${garden.sky.skyColor.b}
        )`;
    document.getElementsByTagName("main")[0].appendChild(garden.sky.skyDiv);


    //grass
    garden.grass.grassDiv.classList.add("grass");
    garden.grass.grassDiv.style.background = `rgb(
        ${garden.grass.grassColor.r},
        ${garden.grass.grassColor.g},
        ${garden.grass.grassColor.b}
        )`;
    document.getElementsByTagName("main")[0].appendChild(garden.grass.grassDiv);
  }
  

   createAndRenderTheGarden();
//    let flower = new Flower();
//    flower.renderFlower();

 for (let i = 0; i < garden.numFlowers; i++) {
      // Create variables for our arguments for clarity
      let x = Math.random() * (window.innerWidth-100);
      let y = Math.random() * 120;
      let size = Math.random() * 30 + 50;
      let stemLength = Math.random() * 50 + 50;
      let petalColor = {
        r: parseInt(Math.random() * 155) + 100,
        g: parseInt(Math.random() * 155) + 100,
        b: parseInt(Math.random() * 155) + 100,
      };

      // Create a new flower using the arguments
      let flower = new Flower(x, y, size, stemLength, petalColor);
      // Add the flower to the array of flowers
      garden.flowers.push(flower);
    }
    for (let i = 0; i < garden.numFlowers; i++) {
  
    // render the array of flowers
    garden.flowers[i].renderFlower();
  }
  console.log(garden.flowers);

  let sun = new Sun(10, 10, {r: 240, g: 206, b: 83});
  sun.renderSun();

  window.addEventListener("keydown", function handleKeydown(e){
console.log(e.key);
 });

 window.addEventListener("keydown", function handleKeyDown(event) {
  //call the handleKeyDown method of class
  sun.handleKeyDownInSUn(event);
});
}