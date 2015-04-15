window.onload = function () {
    document.getElementById("inputField").focus();
};

var timerInterval = undefined;

$(document).ready(function () {
    $('#inputField').keyup(function () {
        window.setTimeout(function () {
            window.clearInterval(timerInterval);
            generateHash();
        }, 2000);
    });
});

function generateHash() {
    var str = $("#inputField").val();
    withoutSpaces = str.replace(/\s/g, '');
    generateHashBoxes(withoutSpaces);
}

function generateHashBoxes(withoutSpaces) {
    $('#withoutSpacesResult').html('');
    $('.hashNumber').html('&nbsp;');

    $('#textWrap').stop().animate({
        marginTop: "65px",
    }, 500, function () {
        $("#boxesWrap").show();
        $("#withoutSpaces .topBox a.hashName").text(withoutSpaces);
    });

}

function doShare(networkName, hashElem) {
    var hash = $('#' + hashElem + ' .hashName').text()
    var shareUrl = 'http://twitter.com/intent/tweet?text=' + hash;
    openPopup(shareUrl);
    
}

function openPopup(popupUrl) {
    fenster = window.open(popupUrl, "_blank", "width=550,height=420,resizable=no", false);
    fenster.focus();
}