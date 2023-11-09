let images = [];
let fullscreen = false;

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
  const image = event.target;
  const slider = document.getElementById("slider");
  // Create a fullscreen container element
  const fullscreenContainer = document.createElement("div");
  fullscreenContainer.classList.add("fullscreen-container");

  // Create an image element inside the fullscreen container
  const fullscreenImage = document.createElement("img");
  fullscreenImage.classList.add("fullscreen-image");
  fullscreenImage.srcset = image.srcset;
  fullscreenContainer.appendChild(fullscreenImage);

  // Append the fullscreen container to the body
  document.body.appendChild(fullscreenContainer);

  // Toggle fullscreen class on click to exit fullscreen
  fullscreenContainer.addEventListener("click", closeFullscreen);
  fullscreenContainer.addEventListener("touch", closeFullscreen);
  document.querySelector("body").classList.add("no-scroll");

  fullscreen = true;
}

function closeFullscreen() {
  const fullscreenContainer = document.querySelector(".fullscreen-container");
  fullscreenContainer.remove();
  document.querySelector("body").classList.remove("no-scroll");
  fullscreen = false;
}
