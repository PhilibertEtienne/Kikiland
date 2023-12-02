/* Pushing button animation */

function changeImageAndRedirect(button) {
  changeButtonSrc(button);
  setTimeout(function () {
    window.location.href = `/${button}`;
  }, 1000);
}

function changeButtonSrc(button) {
  let image = document.getElementById(button);
  let originalSrcSet = `/assets/Images/boutons/${button}/bouton.avif 1800w, 
 /assets/Images/boutons/${button}/half/bouton.avif 1000w, 
 /assets/Images/boutons/${button}/fourth/bouton.avif 600w sizes="100vw"`;
  let pushedSrcSet = `/assets/Images/boutons/${button}/bouton_clic.avif 1800w, 
    /assets/Images/boutons/${button}/half/bouton_clic.avif 1000w, 
    /assets/Images/boutons/${button}/fourth/bouton_clic.avif 600w sizes="100vw"`;
  image.srcset = pushedSrcSet;
  setTimeout(() => {
    image.srcset = originalSrcSet;
  }, 250);
}

/* Hovering button animation */
let buttons = document.querySelectorAll(".bouton");
buttons.forEach((button) => {
  button.addEventListener("mouseenter", () => {
    pushButtonTimeout = setTimeout(() => {
      changeButtonSrc(button.id);
    }, 150);
  });
  button.addEventListener("mouseleave", () => {
    clearTimeout(pushButtonTimeout);
  });
});
