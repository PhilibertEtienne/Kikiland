const container = document.getElementsByClassName("front-gallery-container");
const flashbook = document.getElementsByClassName("flashbook-link");
const flashbookSide = document.getElementsByClassName("flashbookSide-link");
const grid = document.getElementById("grid");

//Handle image Fullscreen on click
getImages("grid-image");
handleImageClick();

function changeCssOnScroll() {
  if (window.scrollY > window.innerHeight / 3 && window.innerWidth >= 1000 ) {
    flashbook.style.display = "none";
    container.style.flexDirection = "row";
    flashbookSide.style.alignSelf = "start";
    flashbookSide.style.position = "sticky";
    flashbookSide.style.display = "block";
    flashbookSide.style.top = "50%";
    flashbookSide.style.maxWidth = "30%";
    flashbookSide.style.marginLeft = "5%";
    flashbookSide.style.aspectRatio = "5/1";
    grid.style.gridTemplateColumns = "repeat(2, minmax(120px, 45%))";
    grid.style.marginTop = "-20vh";
  } else {
    container.removeAttribute("style");
    flashbookSide.removeAttribute("style");
    flashbook.removeAttribute("style");
    grid.removeAttribute("style");
  }
}

window.addEventListener("scroll", changeCssOnScroll);
window.addEventListener("resize", changeCssOnScroll);
