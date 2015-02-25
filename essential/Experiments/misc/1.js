
var keylist = "abcdefghijklmnopqrstuvwxyz@!#$%&*ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789"
var temp = ''
function captchacreator(length) {
    document.captcha.output.value = randomoutput(length)
}
function randomoutput(length) {
    temp = ''
    for (i = 0; i < length; i++)
        temp += keylist.charAt(Math.floor(Math.random() * keylist.length))
    return temp
}
