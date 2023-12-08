import * as util from "./util.js";
const slider = document.getElementById("slider");
const sliderPage = document.getElementById("slider-page");
let slideDirection;
let firstLoad = true;
//Fetch img path from Twig
var jsonData = document.getElementById("Images").getAttribute("data-images");
let imageArray = JSON.parse(jsonData);
//Slider media queries logic
let slideOnEachSide = util.getCSSValue("slideOnEachSide");
let scrollAmountVW = (2 * slideOnEachSide + 1) / 100;

// Slider display
function displayImages() {
  slideOnEachSide = util.getCSSValue("slideOnEachSide");
  util.removeAllChildNodes(slider);
  for (let i = 0; i < 2 * slideOnEachSide + 1; i++) {
    var imgFromArray = document.createElement("picture");
    var imgSource = document.createElement("source");
    var imgImg = document.createElement("img");
    imgFromArray.appendChild(imgSource);
    imgFromArray.appendChild(imgImg);
    var basePath = "/assets/Images/objets/";
    imgFromArray.loading = "lazy"
    imgSource.srcset = `${basePath}half/${imageArray[i].filename}.avif 1800w, ${basePath}fourth/${imageArray[i]}.avif 1000w, ${basePath}eighth/${imageArray[i].filename}.avif 600w`;
    imgSource.sizes = "(max-width:1200px) 33vw, (max-width:640px) 66vw";
    imgSource.type="image/avif"
    imgImg.src=`${basePath}/${imageArray[i].filename}.jpg`
    imgImg.classList.add("slider-image");
    imgImg.style.margin = `${scrollAmountVW}vw`;
    imgImg.style.display = "inline-block";
    slider.appendChild(imgFromArray);
    slider.offsetHeight;

    //apply sizing and animation logic
    //Mid slide
    if (i === slideOnEachSide) {
      if (slideDirection === 1) {
        if (!firstLoad) {
          if (slideOnEachSide != 0) {
            imgFromArray.style.animation =
              "imageSlideRightToMid 0.3s ease-in forwards";
          } else {
            imgFromArray.style.animation =
              "imageSlideAloneLeftToMid 0.3s ease-in forwards";
          }
        }
      } else {
        if (!firstLoad) {
          if (slideOnEachSide != 0) {
            imgFromArray.style.animation =
              "imageSlideLeftToMid 0.3s ease-in forwards";
          } else {
            imgFromArray.style.animation =
              "imageSlideAloneRightToMid 0.3s ease-in forwards";
          }
        }
      }

      //Left Mid slide
    } else if (i - slideOnEachSide === -1) {
      if (firstLoad) {
        imgFromArray.style.scale = "0.6";
        imgFromArray.style.opacity = "0.6";
      } else {
        if (slideDirection === 1) {
          imgFromArray.style.animation =
            "imageSlideMidToLeft 0.3s ease-in forwards";
        } else {
          imgFromArray.style.animation =
            "imageSlideLeftToLeftMid 0.3s ease-in forwards";
        }
      }
    } else if (i - slideOnEachSide === 1) {
      if (firstLoad) {
        imgFromArray.style.scale = "0.6";
        imgFromArray.style.opacity = "0.6";
      } else {
        if (slideDirection === 1) {
          imgFromArray.style.animation =
            "imageSlideRightToFirstRight 0.3s ease-in forwards";
        } else {
          imgFromArray.style.animation =
            "imageSlideMidToFirstRight 0.3s ease-in forwards";
        }
      }
    }
    // Far right slides
    else if (i - slideOnEachSide > 1) {
      if (firstLoad) {
        imgFromArray.style.scale = "0.3";
        imgFromArray.style.opacity = "0.3";
      } else {
        if (slideDirection === 1) {
          imgFromArray.style.animation =
            "imageSlideRightToRight 0.3s ease-in forwards";
        } else {
          imgFromArray.style.animation =
            "imageSlideMidRightToRight 0.3s ease-in forwards";
        }
      }
    }

    // Far left slides
    else if (i < slideOnEachSide) {
      if (firstLoad) {
        imgFromArray.style.scale = "0.3";
        imgFromArray.style.opacity = "0.3";
      } else {
        if (slideDirection === 1) {
          imgFromArray.style.animation =
            "imageSlideMidLeftToLeft 0.3s ease-in forwards";
        } else {
          imgFromArray.style.animation =
            "imageSlideNoneToLeft 0.3s ease-in forwards";
        }
      }
    }
  }

  // animate first and last slide getting out
  var imgGoingOut = document.createElement("img");
  slider.appendChild(imgGoingOut);

  if (slideDirection === 1 && slideOnEachSide > 0) {
    imgGoingOut.srcset = `${basePath}half/${
      imageArray[imageArray.length - 1]
    } 1800w, ${basePath}fourth/${
      imageArray[imageArray.length - 1]
    } 1000w, ${basePath}eighth/${imageArray[imageArray.length - 1]} 600w`;
    imgGoingOut.style.position = "absolute";
    imgGoingOut.classList.add("slider-image-dissapear");
    imgGoingOut.style.animation = "imageSlideLeftToNone 0.3s ease-in forwards";
  } else if (slideDirection === -1 && slideOnEachSide > 0) {
    imgGoingOut.srcset = `${basePath}half/${
      imageArray[2 * slideOnEachSide + 1]
    } 1800w, ${basePath}fourth/${
      imageArray[2 * slideOnEachSide + 1]
    } 1000w, ${basePath}eighth/${imageArray[2 * slideOnEachSide + 1]} 600w`;

    imgGoingOut.style.position = "absolute";
    imgGoingOut.classList.add("slider-image-dissapear");
    imgGoingOut.style.animation = "imageSlideRightToNone 0.3s ease-in forwards";
  }
  getImages("slider-image");
  handleImageClick();
}

// Button sliding logic
let nextbutton = document.querySelector(".next");
let prevbutton = document.querySelector(".prev");

nextbutton.onclick = () => {
  firstLoad = false;
  imageArray.push(imageArray.shift());
  slideDirection = 1;
  displayImages();
};  

prevbutton.onclick = () => {
  firstLoad = false;
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
  if (!fullscreen) {
    firstLoad = false;
    if (e.deltaY < 0) {
      imageArray.push(imageArray.shift());
      slideOnEachSide = util.getCSSValue("slideOnEachSide");
      slideDirection = 1;
      displayImages();
    } else {
      imageArray.unshift(imageArray.pop());
      slideOnEachSide = util.getCSSValue("slideOnEachSide");
      slideDirection = -1;
      displayImages();
    }
  }
});

window.addEventListener("resize", function () {
  firstLoad = true;
  displayImages();
});

// Touch Events
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

slider.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const deltaX = touchEndX - touchStartX;
  if (deltaX > 0) {
    firstLoad = false;
    imageArray.unshift(imageArray.pop());
    slideDirection = 1;
    displayImages();
  } else if (deltaX < 0) {
    firstLoad = false;
    imageArray.push(imageArray.shift());
    slideDirection = -1;
    displayImages();
  }
}
