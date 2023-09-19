const images = document.querySelectorAll('.slider-image');

images.forEach((image) => {
  image.addEventListener('click', openFullscreen);
});

function openFullscreen(event) {
    const image = event.target;
    const sliderContainer = document.getElementById('slider-container');
    const slider = document.getElementById('slider');
    
    const sliderRect = slider.getBoundingClientRect();
    const imageRect = image.getBoundingClientRect();
    
    const imageMiddleX = imageRect.left + imageRect.width / 2;
    const sliderMiddleX = sliderRect.left + sliderRect.width / 2;
    
    // Check if the clicked image is horizontally centered in the slider
    if (Math.abs(imageMiddleX - sliderMiddleX) < 1) {
      // Create a fullscreen container element
      const fullscreenContainer = document.createElement('div');
      fullscreenContainer.classList.add('fullscreen-container');
      
      // Create an image element inside the fullscreen container
      const fullscreenImage = document.createElement('img');
      fullscreenImage.classList.add('fullscreen-image');
      fullscreenImage.src = image.src;
      fullscreenContainer.appendChild(fullscreenImage);
      
      // Append the fullscreen container to the body
      document.body.appendChild(fullscreenContainer);
      
      // Toggle fullscreen class on click to exit fullscreen
      fullscreenContainer.addEventListener('click', closeFullscreen);
      
      // Toggle fullscreen class on body
      document.body.classList.add('fullscreen');
    }
  }
  
  function closeFullscreen() {
    const fullscreenContainer = document.querySelector('.fullscreen-container');
    fullscreenContainer.remove();
  
    document.body.classList.remove('fullscreen');
  }