const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slider-image");
const sliderPage = document.getElementById("slider-page");

//Infinite Slider Logic
let sliderLength = slides.length;
function sliding(currentIndex) {
  let sideSlidesAmount = 2;
  let nextSlides = [];
  let prevSlides = [];

  function getSliderClone(currentIndex) {
    nextSlides = [];
    prevSlides = [];

    for (let i = currentIndex; i < currentIndex + sideSlidesAmount; i++) {
      nextSlides.push(slides[i + 1]);
      prevSlides.push(slides[-i - 1]);
    }

    const cloneNext = document.createDocumentFragment();
    const clonePrev = document.createDocumentFragment();

    nextSlides.forEach((nextSlide) => {
      const clone = nextSlide.cloneNode(true);
      cloneNext.appendChild(clone);
    });

    prevSlides.forEach((prevSlide) => {
      const clone = prevSlide.cloneNode(true);
      clonePrev.appendChild(clone);
    });

    slider.appendChild(cloneNext);
    slider.insertBefore(clonePrev);
  }

  getSliderClone(currentIndex);
  clg
}

// Slide size logic
function updateSlides() {
  let smallWidth = window.innerWidth / 6;
  let mediumWidth = window.innerWidth / 3;
  let fullWidth = window.innerWidth / 2;
  let currentIndex = -1;
  slides.forEach((slide,index) => {
    let imagePosition = slide.getBoundingClientRect().x;
    if (
      (imagePosition >= smallWidth && imagePosition < mediumWidth) ||
      (imagePosition >= fullWidth && imagePosition < 4 * smallWidth)
    ) {
      slide.style.transform = "scale(0.6)";
      slide.style.opacity = "0.6";
    } else if (imagePosition >= mediumWidth && imagePosition <= fullWidth) {
      slide.style.transform = "scale(1)";
      slide.style.opacity = "1";
      currentIndex = index
      sliding(currentIndex)
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
  slider.scrollLeft += (scrollAmountVW * window.innerWidth) / 100;
  updateSlides();
};

prevbutton.onclick = () => {
  slider.scrollLeft -= (scrollAmountVW * window.innerWidth) / 100;
  updateSlides();
};

// Script launch order
document.addEventListener("DOMContentLoaded", function () {
  updateSlides();

  // slides.forEach(slide => {
  //   slide.classList.add("slide-transition");
  // });

  window.addEventListener("resize", () => {
    updateSlides();
  });
  window.addEventListener("scroll", () => {
    updateSlides();
  });
  // scrollSlides();
});
slider.addEventListener("scroll", () => {
  updateSlides();
});

slider.addEventListener("wheel", (evt) => {
  evt.preventDefault();

  const scrollDirection = evt.deltaY > 0 ? 1 : -1;

  slider.scrollLeft +=
    (scrollAmountVW * scrollDirection * window.innerWidth) / 100;
});


