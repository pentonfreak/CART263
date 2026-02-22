class Weather {
  constructor(state, temp, mountEl) {
    this.state = state;  
    this.temp = temp;
    this.mountEl = mountEl;
  }

  renderWeather() {
    if (this.state === "rainy") {
      this.renderRain();
    }
}

renderRain() {
    // Cloud
    const cloud = document.createElement("div");
    cloud.classList.add("cloud");
    this.mountEl.appendChild(cloud);

    // Rain container
    const rain = document.createElement("div");
    rain.classList.add("rain");

    // Create raindrops
    for (let i = 0; i < 40; i++) {
      const drop = document.createElement("div");
      drop.classList.add("drop");

      // random position
      drop.style.left = Math.random() * 100 + "%";
      drop.style.animationDelay = Math.random() * 1 + "s";

      rain.appendChild(drop);
    }

    this.mountEl.appendChild(rain);
    }
}