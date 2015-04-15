var v1 = 0; // boolean
var v2 = 'Hello World'; // string
var v3 = 14; // integer
var v4; // declared for later

// another way to write variables
var v1 = 0, // boolean
    v2 = 'Hello World', // string
    v3 = 14, // integer
    v4; // declared for later

console.log('<Operations>');

var o1 = 31 + 1, // Addition
    o2 = 31 - 1, // subtraction
    o3 = 2 * 31, // Multiplication
    o4 = 31 / 2, // Division
    o5 = 31 % 2, // Modulo - test if a number is odd or even
    o6, o7, o8; // Declare for use later


o6 = o1++; // Add 1
console.log(o1 + ' ++', o6);

o7 = o1--; // Minus 1
console.log(o1 + ' --', o7);

o1 += 2; // plus 2
console.log(o1 + ' +=', '2');

o1 -= 2; // minus 1
console.log(o1 + ' -=', '2');

o1 *= 2; // multiply 2
console.log(o1 + ' *=', '2');

o1 /= 2; // divide 2
console.log(o1 + ' /=', '2');

o1 %= 2; // odd or even - 0 is even - 1 is odd
console.log(o1 + ' %=', '2');

console.log('</Operations>');
console.log('');

console.log('<DataTypes>');

var dt1, dt2, dt3, dt4, dt5, dt6;

dt1 = 'Hello Wold';
console.log(dt1 + ' is typeof', typeof (dt1));
console.log(dt1 + ' isNaN?', isNaN(dt1));

dt2 = 3;
console.log(dt2 + ' is typeof', typeof (dt2));
console.log(dt2 + ' isNaN?', isNaN(dt2));

dt3 = true;
console.log(dt3 + ' is typeof', typeof (dt3));


dt4 = true;
console.log(dt4 + ' is typeof', typeof (dt4));

dt5 = function () { };
console.log(dt5 + ' is typeof', typeof (dt5));

dt6 = {};
console.log(dt6 + ' is typeof', typeof (dt6));

console.log('dt7' + ' is typeof', typeof (dt7));

console.log('</DataTypes>');
console.log('');

console.log('<Booleans>');

var b1, b2, b3, b4;

b1 = 0;
console.log('0' + ' =', b1);

b2 = false;
console.log('false' + ' =', b2);

b3 = 1;
console.log('1' + ' =', b3);

b4 = true;
console.log('true' + ' =', b4);

console.log('</Booleans>');
console.log('');

