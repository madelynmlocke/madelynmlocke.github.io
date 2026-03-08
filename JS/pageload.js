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


/*--------------------------------------------------------------
MOBILE NAV MENU Section
--------------------------------------------------------------*/


    // Get the modal
    var modal = document.getElementById("modal");
    var modalImg = document.getElementById("modal_img");
    var captionText = document.getElementById("caption");
    $('.gallery').click(function () {
        var img = $(this);
        modal.style.display = "block";
        modalImg.src = img.attr('src');
    });

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }