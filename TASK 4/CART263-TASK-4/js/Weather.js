class Weather {
  constructor(state, temp) {
    this.state = state;   // "rainy"
    this.temp = temp;     // number
  }

  renderWeather() {
    if (this.state === "rainy") {
      this.renderRainy();
    }
  }

  renderRainy() {
    // Remove old rain if exists
    const oldRain = document.querySelector(".rain-layer");
    if (oldRain) oldRain.remove();

    // Darken sky
    const sky = document.querySelector(".sky");
    if (sky) {
      sky.style.background = "rgb(40, 60, 90)";
    }

    // Create full screen rain layer
    const rainLayer = document.createElement("div");
    rainLayer.classList.add("rain-layer");

    // Heavy rain (300 drops)
    for (let i = 0; i < 300; i++) {
      const drop = document.createElement("div");
      drop.classList.add("raindrop");

      drop.style.left = Math.random() * 100 + "vw";
      drop.style.animationDuration = 0.3 + Math.random() * 0.4 + "s";
      drop.style.animationDelay = Math.random() * 2 + "s";

      rainLayer.appendChild(drop);
    }

    document.body.appendChild(rainLayer);
  }
}