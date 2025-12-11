const counter = { value: 0 };
const display = document.getElementById("counter");
const head = document.getElementById("head");
const loader = document.getElementById("loader");
const overlay = document.getElementById("overlay");
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
      ease: "power2.out",
      onComplete: () => {
        overlay.style.backgroundColor = "red";
        loader.style.display = "none";
        window.location.href = "landing.html"; 
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

// Run immediately
animateText();

// Repeat smoothly
setInterval(animateText, 3000);
