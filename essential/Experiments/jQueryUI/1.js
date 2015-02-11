$(function () {
    $(".draggable").draggable();
    $("#resizable").resizable();
    $("#selectable").selectable();
    $("#sortable").sortable();
    $("#sortable").disableSelection();
    $("#accordion").accordion();
});
$(function () {
    var availableTags = [
"ActionScript",
"AppleScript",
"Asp",
"BASIC",
"C",
"C++",
"Clojure",
"COBOL",
"ColdFusion",
"Erlang",
"Fortran",
"Groovy",
"Haskell",
"Java",
"JavaScript",
"Lisp",
"Perl",
"PHP",
"Python",
"Ruby",
"Scala",
"Scheme"
    ];
    $("#tags").autocomplete({
        source: availableTags
    });
});