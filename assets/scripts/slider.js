import * as util from "./util.js";
const slider = document.getElementById("slider");
const slider2 = document.getElementById("slider2");
const slides = document.querySelectorAll(".slider-image");
const sliderPage = document.getElementById("slider-page");
let slideDirection = 1;
//Fetch img path from Twig
var jsonData = document.getElementById("images").getAttribute("data-images");
let imageArray = JSON.parse(jsonData);

//Slider media queries logic
let slideOnEachSide = util.getCSSValue("slideOnEachSide");
let scrollAmountVW = (2 * slideOnEachSide + 1) / 100;

function displayImages() {
  slideOnEachSide =util.getCSSValue("slideOnEachSide");
  util.removeAllChildNodes(slider);
  for (let i = 0; i < 2 * slideOnEachSide + 1; i++) {
    var imgFromArray = document.createElement("img");
    imgFromArray.src = "/assets/Images/objets/" + imageArray[i];
    imgFromArray.classList.add("slider-image");
    imgFromArray.style.margin = `${scrollAmountVW}vw`;
    imgFromArray.style.display = "inline-block";
    slider.appendChild(imgFromArray);
    slider.offsetHeight;

    //apply sizing and animation logic
    //Mid slide
    if (i === slideOnEachSide) {
      if (slideDirection === 1) {
        imgFromArray.style.animation =
          "imageSlideRightToMid 0.3s ease-in forwards";
      } else {
        imgFromArray.style.animation =
          "imageSlideLeftToMid 0.3s ease-in forwards";
      }
      //Left Mid slide
    } else if (i - slideOnEachSide === -1) {
      if (slideDirection === 1) {
        imgFromArray.style.animation =
          "imageSlideMidToLeft 0.3s ease-in forwards";
      } else {
        imgFromArray.style.animation =
          "imageSlideLeftToLeftMid 0.3s ease-in forwards";
      }
    } else if (i - slideOnEachSide === 1) {
      if (slideDirection === 1) {
        imgFromArray.style.animation =
          "imageSlideRightToFirstRight 0.3s ease-in forwards";
      } else {
        imgFromArray.style.animation =
          "imageSlideMidToFirstRight 0.3s ease-in forwards";
      }
    }
    // Far right slides
    else if (i - slideOnEachSide > 1) {
      if (slideDirection === 1) {
        imgFromArray.style.animation =
          "imageSlideRightToRight 0.3s ease-in forwards";
      } else {
        imgFromArray.style.animation =
          "imageSlideMidRightToRight 0.3s ease-in forwards";
      }
    }

    // Far left slides
    else if (i < slideOnEachSide) {
      if (slideDirection === 1) {
        imgFromArray.style.animation =
          "imageSlideMidLeftToLeft 0.3s ease-in forwards";
      } else {
        imgFromArray.style.animation =
          "imageSlideNoneToLeft 0.3s ease-in forwards";
      }
    }
  }

  // animate first and last slide getting out
  var imgGoingOut = document.createElement("img");
  slider.appendChild(imgGoingOut);

  if (slideDirection === 1 && slideOnEachSide > 0) {
    imgGoingOut.src =
      "/assets/images/objets/" + imageArray[imageArray.length - 1];
    imgGoingOut.style.position = "absolute";
    imgGoingOut.classList.add("slider-image-dissapear");
    imgGoingOut.style.animation = "imageSlideLeftToNone 0.3s ease-in forwards";
  } else if (slideDirection === 1 && slideOnEachSide > 0) {
    imgGoingOut.src =
      "/assets/images/objets/" + imageArray[2 * slideOnEachSide + 1];
    imgGoingOut.style.position = "absolute";
    imgGoingOut.classList.add("slider-image-dissapear");
    imgGoingOut.style.animation = "imageSlideRightToNone 0.3s ease-in forwards";
  }
}

function giveSlide() {
  if (slideOnEachSide) {
    console.log(slideOnEachSide);
  } else {
    console.log("slideOnEachSide not found");
  }
}
giveSlide();

// Button sliding logic
let nextbutton = document.querySelector(".next");
let prevbutton = document.querySelector(".prev");

nextbutton.onclick = () => {
  imageArray.push(imageArray.shift());
  slideDirection = 1;
  displayImages();
};

prevbutton.onclick = () => {
  imageArray.unshift(imageArray.pop());
  slideDirection = -1;
  displayImages();
};

// Script launch order
document.addEventListener("DOMContentLoaded", function () {
  displayImages();
});

//Event listeners
window.addEventListener("wheel", function (e) {
  if (e.deltaY < 0) {
    imageArray.push(imageArray.shift());
    slideOnEachSide = util.getCSSValue("slideOnEachSide");
    slideDirection = 1;
    displayImages();
  } else {
    imageArray.unshift(imageArray.pop());
    slideOnEachSide =util.getCSSValue("slideOnEachSide");
    slideDirection = -1;
    displayImages();
  }
});

window.addEventListener("resize", function () {
  displayImages();
});

