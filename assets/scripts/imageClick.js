let images = [];
let fullscreen = false;
let fullImageArray;
const sliderPage = document.getElementById("slider-page");
var jsonData = document.getElementById("Images").getAttribute("data-images");
let imageArray = JSON.parse(jsonData);

function getImages(className) {
  return (images = document.querySelectorAll(`.${className}`));
}

function handleImageClick() {
  images.forEach((image) => {
    image.addEventListener("click", openFullscreen);
    image.addEventListener("touch", openFullscreen);
  });
}

function openFullscreen(event) {
  const image = event.currentTarget;

  // Create a fullscreen container element
  const fullscreenContainer = document.createElement("div");
  fullscreenContainer.classList.add("fullscreen-container");
  const fullscreenPicture = image.cloneNode(true);
  const fullScreenPictureSource = fullscreenPicture.querySelector("source");
  const fullScreenPictureImg = fullscreenPicture.querySelector("img");
  fullScreenPictureImg.classList.add("fullscreen-image");
  fullScreenPictureSource.sizes = "60vw";
  fullscreenPicture.removeAttribute("style");
  fullscreenPicture.classList.remove("fade-in");
  fullscreenPicture.classList.remove("grid-image");
  fullScreenPictureImg.classList.remove("slider-image");
  fullScreenPictureImg.classList.remove("pointer");

  // find current image path in image array
  //find common path for different image sources
  const commonPathRegex = /^\/assets\/Images\/[^/]+\//;
  const commonPath = fullScreenPictureSource.srcset.match(commonPathRegex)[0];
  const filenameWithoutExtensionRegex = /\/([^/]+)\.[^/.]+$/;
  console.log("commonpath : " + commonPath);

  const fullPath = image.querySelector("img").src;
  const matches = fullPath.match(filenameWithoutExtensionRegex);
  console.log(matches);
  const filename = matches[1];
  console.log("filename : " + filename);
  console.log("fullpath: " + fullPath);

  const filePosition = imageArray.indexOf(
    imageArray.find((image) => image.filename === filename)
  );
  console.log("filePosition : " + filePosition);

  // Create buttons

  const buttons = document.createElement("div");
  const buttonPrev = document.createElement("img");
  const buttonNext = document.createElement("img");

  buttons.appendChild(buttonPrev);
  buttons.appendChild(buttonNext);

  buttons.classList.add("fullscreen_buttons");
  buttonPrev.classList.add("fullPrev");
  buttonNext.classList.add("fullNext");
  buttonPrev.src = "assets/Images/boutons/fleches/flechegauche.avif";
  buttonNext.src = "assets/Images/boutons/fleches/flechedroite.avif";

  fullscreenContainer.appendChild(fullscreenPicture);
  // if (sliderPage) {
  //   sliderPage.appendChild(buttons);
  // }
  fullscreenContainer.appendChild(buttons);

  document.body.appendChild(fullscreenContainer);

  // Toggle fullscreen class on click to exit fullscreen
  fullscreenContainer.addEventListener("click", closeFullscreen);
  fullscreenContainer.addEventListener("touch", closeFullscreen);
  document.querySelector("body").classList.add("no-scroll");

  fullscreen = true;
  browse(
    fullscreenPicture,
    fullScreenPictureSource,
    fullScreenPictureImg,
    commonPath,
    filePosition
  );
}

function closeFullscreen() {
  const fullscreenContainer = document.querySelector(".fullscreen-container");
  document.querySelector(".fullscreen_buttons").remove();
  fullscreenContainer.remove();
  document.querySelector("body").classList.remove("no-scroll");
  fullscreen = false;
}

function browse(
  fullscreenPicture,
  fullScreenPictureSource,
  fullScreenPictureImg,
  commonPath,
  filePosition
) {
  const fullscreenContainer = document.querySelector(".fullscreen-container");
  const buttons = document.querySelector(".fullscreen_buttons");
  const fullPrev = document.querySelector(".fullPrev");
  const fullNext = document.querySelector(".fullNext");
  let currentFilePosition = filePosition;

  console.log("fullPrev", fullPrev);
  console.log("fullNext", fullNext);
  fullPrev.onclick = (event) => {
    event.stopPropagation();
    if (currentFilePosition === 0) {
      currentFilePosition = imageArray.length - 1;
    } else {
      currentFilePosition -= 1;
    }
    fullScreenPictureSource.srcset = `${commonPath}half/${imageArray[currentFilePosition].filename}.avif 1800w, ${commonPath}fourth/${imageArray[currentFilePosition].filename}.avif 600w, ${commonPath}eighth/${imageArray[currentFilePosition].filename}.avif 200w`;
    fullScreenPictureSource.sizes =
      "(max-width:1200px) 33vw, (max-width:640px) 66vw";
    fullScreenPictureSource.type = "image/avif";
    fullScreenPictureImg.src = `${commonPath}/${imageArray[currentFilePosition].filename}.jpg`;
  };

  fullNext.onclick = (event) => {
    event.stopPropagation();
    if (currentFilePosition === imageArray.length - 1) {
      currentFilePosition = 0;
    } else {
      currentFilePosition += 1;
    }
    fullScreenPictureSource.srcset = `${commonPath}half/${imageArray[currentFilePosition].filename}.avif 1800w, ${commonPath}fourth/${imageArray[currentFilePosition].filename}.avif 600w, ${commonPath}eighth/${imageArray[currentFilePosition].filename}.avif 200w`;
    fullScreenPictureSource.sizes =
      "(max-width:1200px) 33vw, (max-width:640px) 66vw";
    fullScreenPictureSource.type = "image/avif";
    fullScreenPictureImg.src = `${commonPath}/${imageArray[currentFilePosition].filename}.jpg`;
  };

  window.addEventListener("wheel", function (e) {
    if (fullscreen) {
      firstLoad = false;
      if (e.deltaY < 0) {
        fullNext.click();
      } else {
        fullPrev.click();
      }
    }
  });
  window.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
        closeFullscreen();
    }
});
}
