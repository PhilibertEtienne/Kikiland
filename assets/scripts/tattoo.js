const container = document.getElementById("front-gallery-container");
const flashbookSide = document.getElementById("flashbookSide-link");
const grid = document.getElementById("grid");

function changeCssOnScroll() {
  if (window.scrollY > window.innerHeight / 3) {
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
    grid.removeAttribute("style");
    flashbook.style.position = "relative";
  }
}

window.addEventListener("scroll", changeCssOnScroll);
