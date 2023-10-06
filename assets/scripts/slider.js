const slider = document.getElementById("slider");
const slider2 = document.getElementById("slider2");
const slides = document.querySelectorAll(".slider-image");
const sliderPage = document.getElementById("slider-page");
let cssVariables = window.getComputedStyle(document.documentElement);

//Fetch img path from Twig
var jsonData = document.getElementById("images").getAttribute("data-images");
let imageArray = JSON.parse(jsonData);

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//Slider logic
let slideOnEachSide = parseInt(cssVariables.getPropertyValue('--sideSlideNumber'));
let scrollAmountVW = (2 * slideOnEachSide + 1) / 100;

function displayImages() {
  //reset slider

  removeAllChildNodes(slider);
  for (let i = 0; i < 2 * slideOnEachSide + 1; i++) {
    var imgFromArray = document.createElement("img");
    imgFromArray.src = "/assets/images/objets/" + imageArray[i];
    imgFromArray.classList.add("slider-image");
    imgFromArray.style.margin = `${scrollAmountVW}vw`;
    imgFromArray.style.display = "inline-block";
    slider.appendChild(imgFromArray);
    slider.offsetHeight;

    //apply sizing and animation logic

    if (i === slideOnEachSide) {
      imgFromArray.style.animation =
        "imageSlideRightToMid 0.3s ease-in forwards";
    } else {
      if (i - slideOnEachSide === -1) {
        imgFromArray.style.animation =
          "imageSlideMidToLeft 0.3s ease-in forwards";
      } else if (i - slideOnEachSide === 1) {
        imgFromArray.style.animation =
          "imageSlideRightToFirstRight 0.3s ease-in forwards";
      } else if (i - slideOnEachSide > 1) {
        imgFromArray.style.animation =
          "imageSlideRightToRight 0.3s ease-in forwards";
      } else if (i === -1) {
        imgFromArray.style.animation =
          "imageSlideLeftToNone 0.3s ease-in forwards";
      } else {
        imgFromArray.style.animation =
          "imageSlideLeftToLeft 0.3s ease-in forwards";
      }
    }
  }

  // animate first slide getting out
  var imgGoingOut = document.createElement("img");
  slider.appendChild(imgGoingOut);
  imgGoingOut.src =
  "/assets/images/objets/" + imageArray[imageArray.length - 1];
  imgGoingOut.style.position = "absolute";
  imgGoingOut.classList.add("slider-image-dissapear");
  imgGoingOut.style.animation = "imageSlideLeftToNone 0.3s ease-in forwards";
}

// Button sliding logic
let nextbutton = document.querySelector(".next");
let prevbutton = document.querySelector(".prev");

nextbutton.onclick = () => {
  imageArray.push(imageArray.shift());
  displayImages();
};

prevbutton.onclick = () => {
  imageArray.unshift(imageArray.popover());
  displayImages();
};

// Script launch order
document.addEventListener("DOMContentLoaded", function () {
  displayImages();
  

  window.addEventListener("resize", () => {});
});
