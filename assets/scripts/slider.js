const slider = document.getElementById("slider");
let slides = document.querySelectorAll(".slider-image");
const sliderPage = document.getElementById("slider-page");

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
    let imagePosition = slide.getBoundingClientRect().x;
    if (
      (imagePosition >= smallWidth && imagePosition < mediumWidth) ||
      (imagePosition > fullWidth && imagePosition <= 5 * smallWidth)
    ) {
      slide.style.transform = "scale(0.6)";
      slide.style.opacity = "0.6";
    } else if (imagePosition >= mediumWidth && imagePosition <= fullWidth) {
      slide.style.transform = "scale(1)";
      slide.style.opacity = "1";
      // currentSlideIndex = index + slideOnEachSide;
    } else {
      slide.style.transform = "scale(0.3)";
      slide.style.opacity = "0.3";
    }
  });
}

// Button sliding logic

let slidercontainer = document.getElementById("slider-container");
let nextbutton = document.querySelector(".next");
let prevbutton = document.querySelector(".prev");
let scrollAmountVW = 20;

nextbutton.onclick = () => {
  slider.style.left =
    parseInt(slider.style.left || 0) - (20 * window.innerWidth) / 100 + "px";
  currentSlideIndex += 1;
  resetSlider();
  updateSlides();
};

prevbutton.onclick = () => {
  slider.style.left =
    parseInt(slider.style.left || 0) + (20 * window.innerWidth) / 100 + "px";
  currentSlideIndex -= 1;
  resetSlider();
  updateSlides();
};

// scrollSlides();

slider.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  console.log(currentSlideIndex);
  console.log(lastSlideIndex);
  const scrollDirection = evt.deltaY > 0 ? 1 : -1;
  slider.style.left =
    parseInt(slider.style.left || 0) +
    (20 * window.innerWidth * scrollDirection) / 100 +
    "px";
  currentSlideIndex -= scrollDirection;
  resetSlider();
  updateSlides();
});

// Script launch order
document.addEventListener("DOMContentLoaded", function () {
  updateSlides();

  window.addEventListener("resize", () => {
    updateSlides();
  });
  window.addEventListener("scroll", () => {
    updateSlides();
  });
});

function resetSlider() {
  if (currentSlideIndex - 1 > lastSlideIndex + slideOnEachSide) {
    slider.style.left = "0px";
    currentSlideIndex = slideOnEachSide + 1;
    console.log("reset1");
  }
  // if (currentSlideIndex <= slideOnEachSide + 1) {
  //   const maxLeftPosition = lastSlideIndex * scrollAmountVW;
  //   slider.style.left = -(maxLeftPosition * window.innerWidth) / 100 + "px";
  //   currentSlideIndex = lastSlideIndex;
  //   console.log("breakpoint");
  //   console.log(maxLeftPosition);
  // }
}
