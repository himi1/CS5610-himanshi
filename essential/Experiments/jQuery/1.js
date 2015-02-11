
$(function(){
    $("button").click(function(){
        $("#div1").fadeIn();
        $("#div2").fadeIn("slow");
        $("#div3").fadeIn(3000);
    });
    $("#button1").click(function () {
        $("#div1").fadeOut();
        $("#div2").fadeOut("slow");
        $("#div3").fadeOut(3000);
    });
    $("#button2").click(function () {
        $("#div1").fadeToggle();
        $("#div2").fadeToggle("slow");
        $("#div3").fadeToggle(3000);
    });
    $("#button3").click(function () {
        $("#div4").animate({ left: '250px' });
    });
    $("#button4").click(function(){
      $("#p1").css("color", "red").slideUp(2000).slideDown(2000);
        });
    $("#flip").click(function () {
        $("#panel").slideToggle("slow");
    });

});
