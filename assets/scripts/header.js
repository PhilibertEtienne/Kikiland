const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const headerHeight = header.offsetHeight;
  if (scrollY > headerHeight) {
    header.style.backgroundColor = "#ffffff35";
  } else {
    header.style.backgroundColor = "#ffffff";
  }
});
