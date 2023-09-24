const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slider-image");
let currentIndex = 0;
let slidesTotalWidth = slides.length;
let index = 1;
let currentSlide;
let dots;

function updateSlides() {
  let smallWidth = window.innerWidth / 6;
  let mediumWidth = window.innerWidth / 3;
  let fullWidth = window.innerWidth / 2;
  slides.forEach((slide) => {
    let imagePosition = slide.getBoundingClientRect().x;
    console.log(imagePosition);
    if (imagePosition < smallWidth) {
      slide.style.transform = "scale(0.3)";
    } else if (imagePosition >= smallWidth && imagePosition < mediumWidth) {
      slide.style.transform = "scale(0.6)";
    } else if (imagePosition >= mediumWidth && imagePosition < fullWidth) {
      slide.style.transform = "scale(1)";
    } else if (imagePosition >= fullWidth && imagePosition < 4 * smallWidth) {
      slide.style.transform = "scale(0.6)";
    } else {
      slide.style.transform = "scale(0.3)";
    }
  });
}
updateSlides();
window.addEventListener("resize", () => {
  updateSlides();
});

function scrollSlides() {
    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY; 
        slides.forEach( slide => {
            const newPosition = scrollPosition * 0.5;
            slide.style.transform = `translateX(${newPosition}px)`
        });
    })
}

scrollSlides();
