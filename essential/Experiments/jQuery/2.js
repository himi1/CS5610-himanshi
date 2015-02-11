$(document).ready(function () {

    $("#button1").click(function () {
        alert("Text: " + $("#p1").text());
    });
    $("#button2").click(function () {
        alert("HTML: " + $("#p1").html());
    });
    $("#button3").click(function () {
        alert("Value: " + $("#input").val());
    });
    $("#button4").click(function () {
        alert($("#thispage").attr("href"));
    });
    $("#button5").click(function () {
        $("#p2").text("Changed text on click");
    });
    $("#button6").click(function () {
        $("#p2").html(function () {
            return "<i>Hello</i> <b>world</b>";
        });
    });
    $("#button7").click(function () {
        $("#p3").append(" <i>Append text</i>");
    });
    $("#button8").click(function () {
        $("#p3").prepend(" <i>Prepend text</i>");
    });
    $("#button9").click(function () {
        var txt1 = "<b>Created this text using HTML<b>";              // Create text with HTML
        var txt2 = $("<i></i>").text("Created this text using jQuery");  // Create text with jQuery
        var txt3 = document.createElement("p");
        txt3.innerHTML = "Created this text using DOM";               // Create text with DOM
        $("#app").append(txt1, txt2, txt3);     // Append new elements
    });
    $("#button10").click(function () {
        $("#p4").before("<b>used .before</b>");
    });
    $("#button11").click(function () {
        $("#p4").after("<i> used .after</i>");
    });
    $("#button12").click(function () {
        $("#p5").remove();
    });
    $("#button13").click(function () {
        $("#p6").remove(".italic");
    });
    $("#button14").click(function () {
        $("#p6").remove(".bold");
    });
});



