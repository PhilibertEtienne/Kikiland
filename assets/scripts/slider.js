const slider = document.getElementById("slider");
const slider2 = document.getElementById("slider2");
let slides = document.querySelectorAll(".slider-image");
const sliderPage = document.getElementById("slider-page");
let translateX = 0;
let translateX2 = "-100%";

//Slides cloning
let slideOnEachSide = 2;
let currentSlideIndex = slideOnEachSide + 1;
let lastSlideIndex = slides.length - 1;

const firstSlideClone = slides[0].cloneNode(true);
const secondSlideClone = slides[1].cloneNode(true);
const thirdSlideClone = slides[2].cloneNode(true);
const lastSlideClone = slides[slides.length - 1].cloneNode(true);
const secondLastSlideClone = slides[slides.length - 2].cloneNode(true);
const thirdLastSlideClone = slides[slides.length - 3].cloneNode(true);

slider.appendChild(firstSlideClone);
slider.appendChild(secondSlideClone);
slider.appendChild(thirdSlideClone);
slider.insertBefore(thirdLastSlideClone, slides[0]);
slider.insertBefore(secondLastSlideClone, slides[0]);
slider.insertBefore(lastSlideClone, slides[0]);
slides = document.querySelectorAll(".slider-image");

// Slides sizing logic
function updateSlides() {
  let smallWidth = window.innerWidth / 6;
  let mediumWidth = window.innerWidth / 3;
  let fullWidth = window.innerWidth / 2;
  slides.forEach((slide, index) => {
    if (index === currentSlideIndex - 1) {
      slide.style.transform = "scale(1)";
      slide.style.opacity = "1";
    } else if (index < currentSlideIndex - 2 || index > currentSlideIndex) {
      slide.style.transform = "scale(0.3)";
      slide.style.opacity = "0.3";
    } else {
      slide.style.transform = "scale(0.6)";
      slide.style.opacity = "0.6";
    }
  });
}

// Button sliding logic
let nextbutton = document.querySelector(".next");
let prevbutton = document.querySelector(".prev");
let scrollAmountVW = 20;

nextbutton.onclick = () => {
  translateX -= scrollAmountVW;
  slider.style.transform = `translateX(${translateX}vw)`;
  currentSlideIndex += 1;
  resetSlider();
  updateSlides();
};
prevbutton.onclick = () => {
  translateX += scrollAmountVW;
  slider.style.transform = `translateX(${translateX}vw)`;
  currentSlideIndex -= 1;
  resetSlider();
  updateSlides();
};

// scrolling logic;
slider.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  const scrollDirection = evt.deltaY > 0 ? 1 : -1;
  translateX += scrollAmountVW * scrollDirection;
  slider.style.transform = `translateX(${translateX}vw)`;
  currentSlideIndex -= scrollDirection;
  resetSlider();
  setTimeout(updateSlides(), 0.3);
});

// Script launch order
document.addEventListener("DOMContentLoaded", function () {
  updateSlides();

  window.addEventListener("resize", () => {
    updateSlides();
  });
});

// slider reset logic
function resetSlider() {
  if (currentSlideIndex - 1 > lastSlideIndex + slideOnEachSide) {
    translateX = 0;
    slider.style.transform = `translateX(${translateX}vw)`;
    currentSlideIndex = slideOnEachSide + 1;
  } else if (currentSlideIndex <= slideOnEachSide) {
    translateX = -(lastSlideIndex * scrollAmountVW);
    slider.style.transform = `translateX( ${translateX}vw)`;
    currentSlideIndex = lastSlideIndex + (slideOnEachSide + 1);
  }
}

//rotation animation logic

function rotationAnimation(element) {
  element.classList.remove("animate");
  setTimeout(() => {
    element.classList.add("animate");
  }, 0);
}
