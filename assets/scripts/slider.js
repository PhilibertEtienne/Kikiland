const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slider-image");
const sliderPage = document.getElementById(".slider-page");
let currentIndex = 0;
let slidesTotalWidth = slides.length;
let index = 1;
let currentSlide;
let dots;

// Slide size logic
function updateSlides() {
  let smallWidth = window.innerWidth / 6;
  let mediumWidth = window.innerWidth / 3;
  let fullWidth = window.innerWidth / 2;
  slides.forEach((slide) => {
    let imagePosition = slide.getBoundingClientRect().x;
    if (
      (imagePosition >= smallWidth && imagePosition < mediumWidth) ||
      (imagePosition >= fullWidth && imagePosition < 4 * smallWidth)
    ) {
      slide.style.transform = "scale(0.6)";
      slide.style.opacity = "0.6";
    } else if (imagePosition > mediumWidth && imagePosition < fullWidth) {
      slide.style.transform = "scale(1)";
      slide.style.opacity = "1";
    } else {
      slide.style.transform = "scale(0.3)";
      slide.style.opacity = "0.3";
    }
  });
}


function scrollSlides() {
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    slides.forEach((slide) => {
      const newPosition = scrollPosition * 0.5;
      slide.style.transform = `translateX(${newPosition}px)`;
    });
  });
}

// Button sliding logic
let slidercontainer = document.getElementById('slider-container')
let nextbutton = document.querySelector('.next')
let prevbutton = document.querySelector('.prev')

let currentPosition = 0
nextbutton.onclick = () => {
  currentPosition-= 100
  slider.style.transform = `translateX(${currentPosition}vw)`;
  updateSlides()
}

prevbutton.onclick = () => {
  currentPosition += 100
  slider.style.transform = `translateX(${currentPosition}vw)`;
  updateSlides()
}


// Script launch order
document.addEventListener("DOMContentLoaded", function() {
  updateSlides();
  window.addEventListener("resize", () => {
    updateSlides();
  });
  // scrollSlides();
});