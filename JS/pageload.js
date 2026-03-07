// $(window).load(function() {
// 		// Animate loader off screen
// 		$(".pre-load").delay(3000).fadeOut("slow");
// 	});

window.addEventListener("load", () => {
	setTimeout(() => {
    const loader = document.querySelector(".pre-load");
    loader.style.opacity = "0";
    loader.style.transition = "opacity 0.6s ease";

    setTimeout(() => {
    loader.style.display = "none";
    }, 600);
	}, 3000);
});