$(document).ready(function () {
    $("#button1").click(function () {
        var txt = "</br>";
        txt += "Width of div: " + $("#div5").width() + "</br>";
        txt += "Height of div: " + $("#div5").height();
        $("#div5").html(txt);
    });
    $("#button2").click(function () {
        var txt = "";
        txt += "Width of div: " + $("#div6").width() + "</br>";
        txt += "Height of div: " + $("#div6").height() + "</br>";
        txt += "Inner width of div: " + $("#div6").innerWidth() + "</br>";
        txt += "Inner height of div: " + $("#div6").innerHeight();
        $("#div6").html(txt);
    });
    $("#button3").click(function () {
        var txt = "";
        txt += "Width of div: " + $("#div7").width() + "</br>";
        txt += "Height of div: " + $("#div7").height() + "</br>";
        txt += "Outer width: " + $("#div7").outerWidth() + "</br>";
        txt += "Outer height: " + $("#div7").outerHeight();
        $("#div7").html(txt);
    });
    $("#button4").click(function () {
        $("#div8").width(100).height(100);
    });
});