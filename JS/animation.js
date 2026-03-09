// drawLines();

// function getHeight(){
//   return window.innerHeight
// || document.documentElement.clientHeight
// || document.body.clientHeight;
// }

// function drawLines(){
//   var lines = document.getElementsByClassName('line');
//   if(lines.length) {
//     for (var i = 0; i < lines.length; i++) {
//         document.body.removeChild(lines[i]);
//     }
//   }

//   var height = getHeight();
//   for(i=0; i< height/10; i++){
//     var line = document.createElement("div");
//     line.className = "line line-" + i;
//     line.style.top = i * 10 + "px";
//     var time = Math.random() * 5;
//     line.style.animation = "lines " + time + "s infinite";
//     document.body.appendChild(line) ;
//   }
// }

// window.onresize = function(event) {
//   drawLines();
// };

/* SCOLL BOUNCE EFFECT */

const animatedItems = document.querySelectorAll(
  '.reveal-right, .reveal-left, .reveal-rotate'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.4,
  rootMargin: "0px 0px -35% 0px"
});

animatedItems.forEach((item) => observer.observe(item));

