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
  const image = event.currentTarget;
  console.log(image)
  // Create a fullscreen container element
  const fullscreenContainer = document.createElement("div");
  fullscreenContainer.classList.add("fullscreen-container");
  const fullscreenImage = image.cloneNode(true);
  fullscreenImage.querySelector("img").classList.add("fullscreen-image");
  fullscreenImage.querySelector("source").sizes="60vw";
  fullscreenImage.classList.remove("fade-in");
  fullscreenImage.classList.remove("grid-image");
  fullscreenImage.classList.remove("pointer");

  fullscreenContainer.appendChild(fullscreenImage);

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
