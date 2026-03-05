// Mouse Glow Effect
const panels = document.querySelectorAll(".panel");

panels.forEach(panel => {
  panel.style.setProperty("--mouse-x", "50%");
  panel.style.setProperty("--mouse-y", "50%");

  panel.addEventListener("mousemove", (e) => {
    const r = panel.getBoundingClientRect();
    panel.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
    panel.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
  });

  panel.addEventListener("mouseleave", () => {
    panel.style.setProperty("--mouse-x", "50%");
    panel.style.setProperty("--mouse-y", "50%");
  });
});

function movePupils(panel, clientX, clientY, strength = 12) {
	const eyes = panel.querySelectorAll(".eye");
	eyes.forEach(eye => {
		const rect = eye.getBoundingClientRect();
		const cx = rect.left + rect.width / 2;
		const cy = rect.top + rect.height / 2;

		const dx = clientX - cx;
		const dy = clientY - cy;

		const max = strength;
    	const dist = Math.hypot(dx, dy) || 1;
    	const nx = (dx / dist) * Math.min(max, dist / 6);
    	const ny = (dy / dist) * Math.min(max, dist / 6);

		const pupil = eye.querySelector(".pupil");
    	pupil.style.transform = `translate(-50%, -50%) translate(${nx}px, ${ny}px)`;
  	});
}

function centerPupils(panel) {
	panel.querySelectorAll(".pupil").forEach(pupil => {
		pupil.style.transform = "translate(-50%, -50%)";
	});
}

//Panel 1: Hover to see
const hoverPanel = document.querySelector("[data-action='hover-pupils']");
if (hoverPanel) {
	hoverPanel.addEventListener("mousemove", (e) => {
		movePupils(hoverPanel, e.clientX, e.clientY);
	});
	hoverPanel.addEventListener("mouseleave", () => {
		centerPupils(hoverPanel);
	});
}

//Panel 2: Click to blink
const clickPanel = document.querySelector("[data-action='click-blink']");
if (clickPanel) {
	clickPanel.addEventListener("click", () => {
		const pupils = clickPanel.querySelectorAll(".pupil");
		pupils.forEach(pupil => {
			pupil.style.transition = "transform 0.1s ease";
			pupil.style.transform = "translate(-50%, -50%) scale(1, 0.05)";
		});
		setTimeout(() => {
			pupils.forEach(pupil => {
				pupil.style.transform = "translate(-50%, -50%)";
			});
		}, 200);
	});
}

//Panel 3: Hold left click to look
const holdPanel = document.querySelector("[data-action='hold-left-click-grow']");
if (holdPanel) {
	holdPanel.addEventListener("mousedown", (e) => {
		if (e.button === 0) {
			holdPanel.classList.add("open-wide");
		}
	});
	holdPanel.addEventListener("mouseup", () => {
		holdPanel.classList.remove("open-wide");
	});
	holdPanel.addEventListener("mouseleave", () => {
		holdPanel.classList.remove("open-wide");
	});
}

//Panel 4: Press Z to look around
const zPanel = document.querySelector("[data-action='toggle-z']");
const directions = [
	"look-center", "look-up", "look-down", "look-left", "look-right"
];

let currentDirection = 0;
window.addEventListener("keydown", (e) => {
	if (e.key === "z") {
		directions.forEach(dir => zPanel.classList.remove(dir));

		currentDirection = (currentDirection + 1) % directions.length;
		zPanel.classList.add(directions[currentDirection]);
	}

	console.log(e.key);
});

//Panel 5: Hold spacebar to Sharingan
const spacePanel = document.querySelector("[data-action='hold-spacebar']");

if (spacePanel) {
	window.addEventListener("keydown", (e) => {
		if (e.code === "Space") {
			e.preventDefault();
			spacePanel.classList.add("sharingan");
			spacePanel.classList.remove("open-wide");
		}
	});

	window.addEventListener("keyup", (e) => {
		if (e.code === "Space") {
			spacePanel.classList.remove("sharingan");
		}
	});
}