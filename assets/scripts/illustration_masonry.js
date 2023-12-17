import * as util from "./util.js";
const masonry = document.getElementById("masonryContainer");
var jsonData = document.getElementById("Images").getAttribute("data-images");
let imageArray = JSON.parse(jsonData);
const row = document.querySelector(".row");
const imagePath = "/assets/Images/illustration/";
// Number of columns
let cols = 3;
// Map to store all the columns
let colsCollection = {};

function generateMasonry() {


  util.removeAllChildNodes(row);
  imageArray = JSON.parse(jsonData);
  cols = util.getCSSValue("cols");
  colsCollection = {};
  // Create number of columns
  for (let i = 1; i <= cols; i++) {
    colsCollection[`col${i}`] = document.createElement("div");
    colsCollection[`col${i}`].classList.add("column");
  }
  // Add images to each column
  for (var i = 0; i < cols; i++) {
    if (!imageArray.length || !imageArray[i]) break;
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item");
    const item = document.createElement("picture");
    item.classList.add("fade-in");
    item.classList.add("pointer");
    const source = document.createElement("source");
    const img = document.createElement("img");
    item.appendChild(source);
    item.appendChild(img);
    source.srcset =
      imagePath +
      imageArray[i].filename +
      ".avif 2400w," +
      imagePath +
      "half/" +
      imageArray[i].filename +
      ".avif 1200w," +
      imagePath +
      "fourth/" +
      imageArray[i].filename +
      ".avif 800w";
    source.sizes = "(max-width:768px)30vw,50vw";
    source.type = "image/avif";
    img.src = imagePath + "jpg/" + imageArray[i].filename + ".jpg";
    item.alt = imageArray[i].filename;
    itemContainer.appendChild(item);
    colsCollection[`col${i + 1}`].appendChild(itemContainer);

    if (i === cols - 1) {
      imageArray.splice(0, cols);
      // reset i
      i = -1;
    }
  }
  Object.values(colsCollection).forEach((column) => {
    row.appendChild(column);
  });
  getImages("fade-in");
  handleImageClick();
}

document.addEventListener("DOMContentLoaded", function () {
  generateMasonry();
});

window.addEventListener("resize", util.throttle(generateMasonry, 250));
