var mySlideShow = document.getElementById('mySlideShow');
var myPics = ['a.jpg', 'b.jpg', 'c.jpg', 'd.jpg', 'e.jpg', 'f.jpg', 'g.jpg', 'h.jpg', 'i.jpg', 'j.jpg', 'k.jpg', 'l.jpg'];
var PicCount = myPics.length;
var i = 0;
function loop() {
    if (i > (PicCount - 1)) {
        i = 0;
    }
    mySlideShow.innerHTML = '<img src="../../images/' + myPics[i] + '">';
    i++;
    loopTimer = setTimeout('loop()', 1200);
}
