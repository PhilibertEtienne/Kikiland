// SVG
let kiki = document.querySelector('.kiki');
let paths = document.querySelectorAll("path");
fillSvgPaths();

document.addEventListener("scroll", fillSvgPaths);
function fillSvgPaths() {
  let scrollPercentage =
    (document.documentElement.scrollTop + document.body.scrollTop) /
    (document.documentElement.scrollHeight -
      document.documentElement.clientHeight);

  for (var i = 0; i < paths.length; i++) {
    let path = paths[i];
    let pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    let drawLength = pathLength * scrollPercentage;
    path.style.strokeDashoffset = Math.max(0, pathLength - drawLength * 4);

    if (scrollPercentage >= 0.6){
      kiki.style.opacity = scrollPercentage/3;
    }
    else {
      kiki.style.opacity = '1'
    }
  }

}
