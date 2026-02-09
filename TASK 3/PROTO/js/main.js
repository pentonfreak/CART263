const stage = document.getElementById("stage");

// main dot
const dot = document.createElement("div");
dot.className = "dot";
stage.appendChild(dot);

// dot position
let x = window.innerWidth / 2;
let y = window.innerHeight / 2;

// mouse state
let mouse = {
  x: 0,
  y: 0,
  active: false
};

// hover only
stage.addEventListener("mouseover", () => {
  mouse.active = true;
});


stage.addEventListener("mouseout", () => {
  mouse.active = false;
});


stage.addEventListener("mousemove", (e) => {
  const rect = stage.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

// animation loop
function animate() {
  requestAnimationFrame(animate);

  if (mouse.active) {
    // move dot slowly toward mouse
    x += (mouse.x - x) * 0.1;
    y += (mouse.y - y) * 0.1;

    // leave a trace
    const trace = document.createElement("div");
    trace.className = "trace";
    trace.style.left = x + "px";
    trace.style.top = y + "px";
    stage.appendChild(trace);

    // remove after animation ends
    setTimeout(() => {
      trace.remove();
    }, 2000);
  }

  dot.style.left = x + "px";
  dot.style.top = y + "px";
}

animate();
