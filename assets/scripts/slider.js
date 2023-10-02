const slider = document.getElementById("slider");
let slides = document.querySelectorAll(".slider-image");
const sliderPage = document.getElementById("slider-page");
let slideOnEachSide = 2;
let currentSlideIndex = 0;
let lastSlideIndex = slides.length - 1;

const firstSlideClone = slides[0].cloneNode(true);
const secondSlideClone = slides[1].cloneNode(true);
const thirdSlideClone = slides[2].cloneNode(true);
const fourthSlideClone = slides[3].cloneNode(true);
const fifthSlideClone = slides[4].cloneNode(true);
const lastSlideClone = slides[slides.length - 1].cloneNode(true);
const secondLastSlideClone = slides[slides.length - 2].cloneNode(true);
const thirdLastSlideClone = slides[slides.length - 3].cloneNode(true);
const fourthLastSlideClone = slides[slides.length - 4].cloneNode(true);
const fifthLastSlideClone = slides[slides.length - 5].cloneNode(true);

slider.appendChild(firstSlideClone);
slider.appendChild(secondSlideClone);
slider.appendChild(thirdSlideClone);
slider.appendChild(fourthSlideClone);
slider.appendChild(fifthSlideClone);
slider.insertBefore(fifthLastSlideClone, slides[0]);
slider.insertBefore(fourthLastSlideClone, slides[0]);
slider.insertBefore(thirdLastSlideClone, slides[0]);
slider.insertBefore(secondLastSlideClone, slides[0]);
slider.insertBefore(lastSlideClone, slides[0]);
slides = document.querySelectorAll(".slider-image");

// Slide size logic
function updateSlides() {
  let smallWidth = window.innerWidth / 6;
  let mediumWidth = window.innerWidth / 3;
  let fullWidth = window.innerWidth / 2;
  slides.forEach((slide,index) => {
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
      currentSlideIndex = index
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

// scrollSlides();

slider.addEventListener("scroll", () => {
  updateSlides();
});

slider.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  console.log(currentSlideIndex)
  console.log(lastSlideIndex)
  const scrollDirection = evt.deltaY > 0 ? 1 : -1;

  slider.scrollLeft -=
    (scrollAmountVW * scrollDirection * window.innerWidth) / 100;
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
    debounce(updateSlides());
  });
});

// debounce
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

function resetSlider(){
  if(currentSlideIndex === lastSlideIndex+1){
    slider.scrollLeft = (-2* scrollAmountVW  * window.innerWidth) / 100 ;
  }
}