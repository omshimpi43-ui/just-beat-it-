const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const startText = document.getElementById("startText");
const stickman = document.getElementById("stickman");
const message = document.getElementById("message");
const crack = document.getElementById("crack");
const ouch = document.getElementById("ouch");

startText.addEventListener("click", () => {
  screen1.style.display = "none";
  screen2.style.display = "block";
});


// Drag logic
let draggedWeapon = null;

document.querySelectorAll(".weapon").forEach(w => {
  w.draggable = true;

  w.ondragstart = e => {
    draggedWeapon = w;
  };
});

screen2.ondragover = e => e.preventDefault();

screen2.ondrop = e => {
  if (!draggedWeapon) return;

  const stickRect = stickman.getBoundingClientRect();

  if (
    e.clientX > stickRect.left &&
    e.clientX < stickRect.right &&
    e.clientY > stickRect.top &&
    e.clientY < stickRect.bottom
  ) {
    hitStickman(draggedWeapon.dataset.msg);
  }
};

function hitStickman(text) {
  stickman.style.transform = "rotate(90deg)";
  crack.currentTime = 0;
  ouch.currentTime = 0;
  crack.play();
  ouch.play();

  message.textContent = text;
  message.classList.remove("hidden");

  setTimeout(() => {
    stickman.style.transform = "rotate(0deg)";
    message.classList.add("hidden");
  }, 2000);
}

