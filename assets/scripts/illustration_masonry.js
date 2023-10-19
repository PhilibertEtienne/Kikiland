import * as util from "./util.js";
var jsonData = document.getElementById("images").getAttribute("data-images");
let imageArray = JSON.parse(jsonData);
const masonry = document.getElementById("masonryContainer");
const row = document.querySelector(".row");

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
    const item = document.createElement("img");
    item.src = "/assets/Images/illustration/" + imageArray[i];
    item.setAttribute("loading", "lazy");
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
  getImages("item");
  handleImageClick();
}

document.addEventListener("DOMContentLoaded", function () {
  generateMasonry();
});

window.addEventListener("resize", util.throttle(generateMasonry, 250));
