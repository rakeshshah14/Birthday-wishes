let screens = document.querySelectorAll(".screen");

function nextScreen(id) {
  screens.forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  if (id === "wish") confettiBurst();
  if (id === "message") typeMessage();
}

/* 🎵 MUSIC */
const music = document.getElementById("bgMusic");
document.getElementById("musicBtn").onclick = () => {
  music.paused ? music.play() : music.pause();
};

/* ⏳ COUNTDOWN */
let count = 3;
let countText = document.getElementById("countText");

let interval = setInterval(() => {
  count--;
  countText.innerText = count;

  if (count === 0) {
    clearInterval(interval);
    setTimeout(() => nextScreen("loading"), 500);
    setTimeout(() => nextScreen("start"), 2000);
  }
}, 1000);

/* 🎂 SWIPE CAKE */
let cake = document.getElementById("cake");
let knife = document.getElementById("knife");
let startX = 0;

cake.addEventListener("touchstart", e => startX = e.touches[0].clientX);
cake.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  if (Math.abs(endX - startX) > 50) cutCake();
});

cake.addEventListener("mousedown", e => startX = e.clientX);
cake.addEventListener("mouseup", e => {
  let endX = e.clientX;
  if (Math.abs(endX - startX) > 50) cutCake();
});

function cutCake() {
  knife.style.display = "block";
  knife.style.left = "50%";
  setTimeout(() => nextScreen("wish"), 800);
}

/* 🎉 CONFETTI */
function confettiBurst() {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
}

/* 📝 TYPING MESSAGE */
let msg = "Happy Birthday 💖 You deserve all happiness and love in the world!";
let i = 0;

function typeMessage() {
  let el = document.getElementById("typedText");
  el.innerHTML = "";

  let typing = setInterval(() => {
    el.innerHTML += msg.charAt(i);
    i++;
    if (i >= msg.length) clearInterval(typing);
  }, 40);
}

/* 🖼 CARD SLIDER */
let cards = document.querySelectorAll(".card");
let index = 0;

setInterval(() => {
  if (!cards.length) return;
  cards[index].style.zIndex = 0;
  index = (index + 1) % cards.length;
  cards[index].style.zIndex = 2;
}, 2000);
