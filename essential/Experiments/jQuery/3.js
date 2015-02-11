$(document).ready(function () {
    $("#button1").click(function () {
        $("#p1").addClass("blue");
        $("#p2").addClass("green");
        $("#p3").addClass("bold");
    });
    $("#button2").click(function () {
        $("#p4").addClass("green bold");
    });
    $("#button3").click(function () {
        $("#p5").addClass("green bold");
    });
    $("#button4").click(function () {
        $("#p5").removeClass("bold");
    });
    $("#button5").click(function () {
        $("#p5").removeClass("green");
    });
    $("#button6").click(function () {
        $("#p6").toggleClass("blue");
    });
    $("#button7").click(function () {
        alert("Text color = " + $("#p7").css("color"));
    });
    $("#button8").click(function () {
        $("#p8").css("color", "green");
    });
    $("#button9").click(function () {
        $("#p8").css("background-color", "black");
    });
    $("#button10").click(function () {
        $("#p9").css({ "background-color": "black", "font-weight": "bold"});
    });

});



