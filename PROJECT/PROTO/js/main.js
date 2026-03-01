// ---------- Helpers ----------
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const lerp = (a, b, t) => a + (b - a) * t;

// ---------- Theme ----------
const themeBtn = $("#themeBtn");
const savedTheme = localStorage.getItem("theme");
if (savedTheme) document.documentElement.dataset.theme = savedTheme;

themeBtn.addEventListener("click", () => {
  const isLight = document.documentElement.dataset.theme === "light";
  document.documentElement.dataset.theme = isLight ? "" : "light";
  localStorage.setItem("theme", document.documentElement.dataset.theme);
});

// ---------- Smooth scroll CTA ----------
$("#scrollCta").addEventListener("click", () => {
  $("#work").scrollIntoView({ behavior: "smooth" });
});

// ---------- Footer year ----------
$("#year").textContent = new Date().getFullYear();

// ---------- Orbs parallax ----------
const orbs = $$(".orb");
let mx = 0, my = 0;
window.addEventListener("mousemove", (e) => {
  mx = e.clientX / window.innerWidth;
  my = e.clientY / window.innerHeight;
});
function animateOrbs(){
  orbs.forEach((o, i) => {
    const depth = (i + 1) * 10;
    o.style.transform = `translate(${(mx - .5) * depth}px, ${(my - .5) * depth}px)`;
  });
  requestAnimationFrame(animateOrbs);
}
animateOrbs();

// ---------- Custom cursor + trail ----------
const cursor = $("#cursor");
const cursorDot = $("#cursorDot");
const trail = $("#trail");

let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
let tx = cx, ty = cy;
let dx = cx, dy = cy;

window.addEventListener("mousemove", (e) => {
  cx = e.clientX; cy = e.clientY;
});

function animateCursor(){
  tx = lerp(tx, cx, 0.18);
  ty = lerp(ty, cy, 0.18);

  dx = lerp(dx, cx, 0.45);
  dy = lerp(dy, cy, 0.45);

  cursor.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
  cursorDot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
  trail.style.transform = `translate(${lerp(parseFloat(trail.dataset.x||tx), cx, 0.08)}px, ${lerp(parseFloat(trail.dataset.y||ty), cy, 0.08)}px) translate(-50%, -50%)`;

  trail.dataset.x = lerp(parseFloat(trail.dataset.x||tx), cx, 0.08);
  trail.dataset.y = lerp(parseFloat(trail.dataset.y||ty), cy, 0.08);

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor scale on interactive elements
const hoverables = ["a", "button", ".card", ".pill", "input", "textarea", ".linkRow"];
function bindHoverScale(){
  $$(hoverables.join(",")).forEach(el => {
    el.addEventListener("mouseenter", () => cursor.style.transform += " scale(1.35)");
    el.addEventListener("mouseleave", () => cursor.style.transform = cursor.style.transform.replace(" scale(1.35)", ""));
  });
}
bindHoverScale();

// ---------- Magnetic elements ----------
function magnetic(el){
  const strength = 18;
  let rAF = null;

  const onMove = (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    const nx = clamp(x / (rect.width / 2), -1, 1);
    const ny = clamp(y / (rect.height / 2), -1, 1);

    if (rAF) cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(() => {
      el.style.transform = `translate(${nx * strength}px, ${ny * strength}px)`;
    });
  };

  const onLeave = () => {
    el.style.transform = `translate(0px, 0px)`;
  };

  el.addEventListener("mousemove", onMove);
  el.addEventListener("mouseleave", onLeave);
}

$$("[data-magnetic]").forEach(magnetic);

// ---------- Tilt cards ----------
function tilt(el){
  const max = 10;
  let rAF = null;

  const move = (e) => {
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    const rx = (0.5 - py) * max;
    const ry = (px - 0.5) * max;

    if (rAF) cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(() => {
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
  };

  const leave = () => {
    el.style.transform = `rotateX(0deg) rotateY(0deg)`;
  };

  el.addEventListener("mousemove", move);
  el.addEventListener("mouseleave", leave);
}
$$("[data-tilt]").forEach(tilt);

// ---------- Scroll reveal ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) en.target.classList.add("in");
  });
}, { threshold: 0.12 });

$$(".reveal").forEach(el => io.observe(el));

// ---------- Active nav link ----------
const sections = ["work", "about", "skills", "contact"].map(id => document.getElementById(id));
const navLinks = $$(".navLink");

const navIO = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const id = en.target.id;
    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
  });
}, { rootMargin: "-45% 0px -45% 0px", threshold: 0.01 });

sections.forEach(s => navIO.observe(s));

// ---------- Animated counters ----------
function animateCounter(el, target){
  const start = performance.now();
  const dur = 900;
  const from = 0;

  const tick = (t) => {
    const p = clamp((t - start) / dur, 0, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(lerp(from, target, eased));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target;
    const target = parseInt(el.dataset.counter || "0", 10);
    animateCounter(el, target);
    counterIO.unobserve(el);
  });
}, { threshold: 0.6 });

$$("[data-counter]").forEach(el => counterIO.observe(el));

// ---------- Skills meter interaction ----------
$$(".meter").forEach(m => {
  const v = parseFloat(m.dataset.meter || "0.5");
  const fill = m.querySelector("span");
  m.closest(".skillCard").addEventListener("mouseenter", () => {
    fill.style.transform = `scaleX(${clamp(v, 0.05, 1)})`;
  });
  m.closest(".skillCard").addEventListener("mouseleave", () => {
    fill.style.transform = "scaleX(.12)";
  });
});

// ---------- Projects data + rendering ----------
const projects = [
  {
    title: "Astral Collage Series",
    desc: "Photomanipulation with NASA-like textures + cinematic color grading.",
    tags: ["photo", "composition", "color"],
    type: "photo",
    img: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1200&q=70"
  },
  {
    title: "Fog City Render",
    desc: "3D environment lighting study with volumetric fog and rim lights.",
    tags: ["3d", "lighting", "mood"],
    type: "3d",
    img: "https://images.unsplash.com/photo-1520975958225-1a6a2b6f2bfe?auto=format&fit=crop&w=1200&q=70"
  },
  {
    title: "Interactive Glyph Field",
    desc: "Mouse-reactive canvas piece: flow + glow, tuned for performance.",
    tags: ["interactive", "canvas", "motion"],
    type: "interactive",
    img: "https://images.unsplash.com/photo-1526378722484-cc5c5101b5f9?auto=format&fit=crop&w=1200&q=70"
  },
  {
    title: "Studio Product Scene",
    desc: "Softbox lighting + clean materials, a commercial-style 3D setup.",
    tags: ["3d", "materials", "render"],
    type: "3d",
    img: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=70"
  },
  {
    title: "Dream Poster System",
    desc: "Graphic posters with modular grid and texture overlays.",
    tags: ["photo", "typography", "layout"],
    type: "photo",
    img: "https://images.unsplash.com/photo-1526481280695-3c687fd5432c?auto=format&fit=crop&w=1200&q=70"
  },
  {
    title: "UI Motion Study",
    desc: "Micro-interactions: magnetic hover, tilt, blur depth, smooth reveal.",
    tags: ["interactive", "ui", "easing"],
    type: "interactive",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=70"
  }
];

const grid = $("#projectsGrid");

function cardTemplate(p, idx){
  const tagHtml = p.tags.map(t => `<span class="tag">${t}</span>`).join("");
  return `
    <article class="card tilt reveal" data-tilt data-type="${p.type}" data-idx="${idx}" style="--d:${idx*60}ms">
      <div class="cardGlow"></div>
      <div class="cardImg" style="background-image:url('${p.img}')"></div>
      <div class="cardBody">
        <h3 class="cardTitle">${p.title}</h3>
        <p class="cardDesc">${p.desc}</p>
        <div class="tagRow">${tagHtml}</div>
      </div>
    </article>
  `;
}

function renderProjects(list){
  grid.innerHTML = list.map(cardTemplate).join("");
  // re-bind tilt on newly created cards
  $$("[data-tilt]", grid).forEach(tilt);

  // reveal observer for new nodes
  $$(".reveal", grid).forEach(el => io.observe(el));

  // glow follow
  $$(".card", grid).forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 100;
      const my = ((e.clientY - r.top) / r.height) * 100;
      card.style.setProperty("--mx", `${mx}%`);
      card.style.setProperty("--my", `${my}%`);
    });
    card.addEventListener("click", () => openModal(parseInt(card.dataset.idx, 10)));
  });

  bindHoverScale();
  $$("[data-magnetic]").forEach(magnetic);
}

renderProjects(projects);

// Filters
const pills = $$(".pill");
pills.forEach(p => p.addEventListener("click", () => {
  pills.forEach(x => x.classList.remove("active"));
  p.classList.add("active");

  const f = p.dataset.filter;
  const filtered = f === "all" ? projects : projects.filter(x => x.type === f);
  renderProjects(filtered);
}));

// ---------- Modal ----------
const modal = $("#modal");
const modalBackdrop = $("#modalBackdrop");
const modalClose = $("#modalClose");
const modalImg = $("#modalImg");
const modalTitle = $("#modalTitle");
const modalDesc = $("#modalDesc");
const modalTags = $("#modalTags");

function openModal(idx){
  const p = projects[idx];
  modalImg.style.backgroundImage = `url('${p.img}')`;
  modalTitle.textContent = p.title;
  modalDesc.textContent = p.desc;
  modalTags.innerHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join("");

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

modalBackdrop.addEventListener("click", closeModal);
modalClose.addEventListener("click", closeModal);
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});

// ---------- Contact form animation (no backend) ----------
const form = $("#contactForm");
const formNote = $("#formNote");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = form.querySelector("button[type='submit']");
  btn.classList.add("sending");
  formNote.textContent = "Sending…";

  setTimeout(() => {
    btn.classList.remove("sending");
    form.reset();
    formNote.textContent = "Sent (demo). Hook this up to Formspree / your backend.";
  }, 1100);
});

// ---------- Interactive hero canvas ----------
const canvas = $("#heroCanvas");
const ctx = canvas.getContext("2d");

let t = 0;
let pointer = { x: 0.5, y: 0.45 };

canvas.addEventListener("mousemove", (e) => {
  const r = canvas.getBoundingClientRect();
  pointer.x = (e.clientX - r.left) / r.width;
  pointer.y = (e.clientY - r.top) / r.height;
});

let paletteIndex = 0;
const palettes = [
  { a: [160, 255, 170], b: [190, 140, 255] },
  { a: [255, 180, 120], b: [120, 220, 255] },
  { a: [160, 255, 240], b: [255, 140, 220] },
  { a: [255, 255, 255], b: [180, 220, 255] },
];

function mix(c1, c2, u){
  return [
    Math.round(lerp(c1[0], c2[0], u)),
    Math.round(lerp(c1[1], c2[1], u)),
    Math.round(lerp(c1[2], c2[2], u)),
  ];
}

function draw(){
  const w = canvas.width, h = canvas.height;
  t += 0.01;

  // background
  ctx.clearRect(0,0,w,h);

  const pal = palettes[paletteIndex];

  // Flow field points
  const cols = 70;
  const rows = 60;
  const cellW = w / cols;
  const cellH = h / rows;

  for (let y = 0; y < rows; y++){
    for (let x = 0; x < cols; x++){
      const px = x * cellW + cellW * 0.5;
      const py = y * cellH + cellH * 0.5;

      const nx = x / cols;
      const ny = y / rows;

      const dx = nx - pointer.x;
      const dy = ny - pointer.y;
      const dist = Math.sqrt(dx*dx + dy*dy);

      const wave = Math.sin((nx * 6 + t) * 1.1) + Math.cos((ny * 7 - t) * 1.0);
      const pull = Math.exp(-dist * 6);

      const ang = wave + pull * 4.5;
      const len = 8 + pull * 18;

      const x2 = px + Math.cos(ang) * len;
      const y2 = py + Math.sin(ang) * len;

      const col = mix(pal.a, pal.b, clamp((wave + 2) / 4, 0, 1));
      const alpha = 0.06 + pull * 0.22;

      ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${alpha})`;
      ctx.lineWidth = 1.2;

      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }

  // Soft glow at pointer
  const gx = pointer.x * w;
  const gy = pointer.y * h;
  const g = ctx.createRadialGradient(gx, gy, 10, gx, gy, 240);
  g.addColorStop(0, `rgba(255,255,255,0.16)`);
  g.addColorStop(1, `rgba(255,255,255,0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0,0,w,h);

  requestAnimationFrame(draw);
}
draw();

$("#shuffleBtn").addEventListener("click", () => {
  paletteIndex = (paletteIndex + 1) % palettes.length;
});

// ---------- Small UX: reduce motion respect ----------
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches){
  // Disable cursor/trail and heavy transforms
  cursor.style.display = "none";
  cursorDot.style.display = "none";
  trail.style.display = "none";
}