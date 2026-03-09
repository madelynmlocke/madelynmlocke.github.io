/* CURSOR GLOW EFFECT */

const glow = document.querySelector('.cursor-glow');

let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX - 110;
  mouseY = e.clientY - 110;
});

function animate() {
  glow.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  requestAnimationFrame(animate);
}

animate();

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

