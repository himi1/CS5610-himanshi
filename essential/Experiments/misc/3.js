function canvas() {
    var ctx = document.getElementById('canvas').getContext('2d');
    ctx.canvas.addEventListener('mousemove', function (event) {
        var mouseX = event.clientX - ctx.canvas.offsetLeft;
        var mouseY = event.clientY - ctx.canvas.offsetTop;
        var status = document.getElementById('CurrentStatus');
        status.innerHTML = "Current mouse Position : (" + mouseX + ", " + mouseY + ")";
    });
    ctx.canvas.addEventListener('click', function (event) {
        var mouseX = event.clientX - ctx.canvas.offsetLeft;
        var mouseY = event.clientY - ctx.canvas.offsetTop;
        ctx.fillStyle = "red";
        ctx.fillRect(mouseX - 10, mouseY - 10, 10, 10);
    });
}
window.addEventListener('load', function (event) {
    canvas();
});