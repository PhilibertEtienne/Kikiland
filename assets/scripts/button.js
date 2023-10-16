/* Pushing button animation */

function changeImageAndRedirect(folder) {
    var image = document.getElementById(folder);
    var originalSrc = image.src; 

    image.src = `/assets/Images/boutons/${folder}/bouton_clic.avif`;
    
    setTimeout(function() {
        image.src = originalSrc;
        
        setTimeout(function() {
            window.location.href = `/${folder}`;
        }, 500);
    }, 500);
}
