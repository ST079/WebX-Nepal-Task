const counter = { value: 0 };
const display = document.getElementById("counter");
const head = document.getElementById("head");
const loader = document.getElementById("loader");
const overlay = document.getElementById("overlay");
const header = document.getElementById("header");
const mainSection = document.getElementById("main-section");
const btn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");

// Box Animation
gsap.to("#box", {
  y: -1000,
  duration: 2,
  delay: 1,
  ease: "linear",
});

gsap.to(counter, {
  value: 100,
  duration: 2,
  delay: 1, // 5 seconds
  ease: "linear",
  onUpdate: () => {
    display.textContent = Math.round(counter.value) + "%";
  },
});

//heading animation
gsap.to("#counter", {
  duration: 2,
  color: "black",
  ease: "linear",
  delay: 1,
  onUpdate: () => {
    if (counter.value >= 50) {
      head.textContent = "We Are";
    }
  },
  onComplete: () => {
    // Fade out loader when counter reaches 100%
    gsap.to(loader, {
      opacity: 0,
      duration: 0.5,
      delay: 1,
      onComplete: () => {
        loader.style.display = "none";
        header.style.display = "flex";
        mainSection.style.display = "block";
      },
    });
  },
});

// Sub Heads Animation
gsap.from("#logo", {
  opacity: 0,
  duration: 1,
});
const texts = ["Delivering firsts", "Defining the future"];
let index = 0;
let split;
function animateText() {
  const element = document.getElementById("sub-head");
  // Kill old animations
  gsap.killTweensOf(element);
  // Revert old SplitText
  if (split) {
    split.revert();
    element.innerHTML = element.textContent;
  }
  // Set the new text
  element.textContent = texts[index];
  // Split new text
  split = new SplitText(element, { type: "words" });
  // Animate words
  gsap.from(split.words, {
    opacity: 0,
    duration: 1,
    delay: 0.5,
    stagger: 0.12,
  });
  // Move to next text
  index = (index + 1) % texts.length;
}
animateText();
setInterval(animateText, 3000);

// Navigation Animation

let navOpen = false;
btn.addEventListener("click", () => {
  if (!navOpen) {
    gsap.to(nav, {
      opacity: 1,
      duration: 1,
      ease: "power3.out",
    });
  } else {
    gsap.to(nav, {
      opacity: 0,
      duration: 0.2,
      ease: "power1.in",
    });
  }
  navOpen = !navOpen;

  gsap.to(btn, {
    x: navOpen ? nav.offsetWidth : 0,
    duration: 0.8,
    ease: "power3.out",
    backgroundColor: navOpen ? "#424A53" : "white",
    textContent: navOpen ? "X" : "Menu",
    color: navOpen ? "white" : "black",
  });
});

//pointer text animation

var pointerText = document.getElementById("pointer-text");

mainSection.addEventListener("mouseenter", function () {
  pointerText.style.display = "block";
});

mainSection.addEventListener("mousemove", function (e) {
  pointerText.style.left = e.pageX + "px";
  pointerText.style.top = e.pageY + "px";
});

mainSection.addEventListener("mouseleave", function () {
  pointerText.style.display = "none";
});

// FAST IMAGE SWITCH ON HOVER
const imgBox = document.getElementById("img-box");
const innerBox = document.getElementById("inner-box");
const images = imgBox.querySelectorAll("img");

let indexA = 0;
let imageInterval;

// Hide all images except first
images.forEach((img, i) => {
  img.style.opacity = i === 0 ? 1 : 0;
  img.style.transition = "opacity 0.2s ease";
});

// ---- HOVER START ----
innerBox.addEventListener("mouseenter", () => {
  imgBox.classList.remove("hidden"); // show image box
  imgBox.style.display = "flex";

  imageInterval = setInterval(() => {
    let next = (indexA + 1) % images.length;

    gsap.to(images[indexA], { opacity: 0, duration: 0.15 });
    gsap.to(images[next], { opacity: 1, duration: 0.15 });

    indexA = next;
  }, 150); // speed (smaller = faster)
});

// ---- HOVER END ----
innerBox.addEventListener("mouseleave", () => {
  imgBox.classList.add("hidden"); // hide images again
  imgBox.style.display = "none";
  clearInterval(imageInterval);
});

// 3D ROTATION BASED ON MOUSE MOVEMENT
document.addEventListener("mousemove", (e) => {
  // get viewport center
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // calculate rotation based on mouse distance from center
  const rotateY = ((e.clientX - centerX) / centerX) * 5;
  const rotateX = -((e.clientY - centerY) / centerY) * 5;

  gsap.to(innerBox, {
    rotationY: rotateY,
    rotationX: rotateX,
    duration: 0.4,
    ease: "power2.out",
  });
});
