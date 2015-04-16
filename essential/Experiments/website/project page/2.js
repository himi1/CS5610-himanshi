jQuery(document).ready(function () {

    // Get the Canvas set to the proper size
    canvas = document.getElementById("locoalien");

    var mouseX = 0, mouseY = 0;
    canvas.addEventListener("mousemove", function (e) {
        var scrollX = (window.scrollX !== null && typeof window.scrollX !== 'undefined') ? window.scrollX : window.pageXOffset;
        var scrollY = (window.scrollY !== null && typeof window.scrollY !== 'undefined') ? window.scrollY : window.pageYOffset;
        mouseX = e.clientX - curElement.offsetLeft + scrollX;
        mouseY = e.clientY - curElement.offsetTop + scrollY;
    }, false);
    canvas.addEventListener("click", function (e) {
        if (mouseX < 1000) {
            window.location = "http://google.com";
        }
    }, false);
    // writing text over canvas

    var ctx = canvas.getContext("2d");

    ctx.font = "20px Georgia";
    ctx.fillText("Hello World!", 10, 50);

    ctx.font = "30px Verdana";
    // Create gradient
    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.fillText("Big smile!", 10, 90);

    
});