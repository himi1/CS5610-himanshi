console.log('<LogicalOperators>');

var lo;

lo = !true;
console.log('!true' + ' =', lo);

lo = true && true;
console.log('true && true' + ' =', lo);

lo = true && false;
console.log('true && false' + ' =', lo);

lo = false && true;
console.log('false && true' + ' =', lo);

lo = false && false;
console.log('false && false' + ' =', lo);

lo = true || true;
console.log('true || true' + ' =', lo);

lo = true || false;
console.log('true || false' + ' =', lo);

lo = false || true;
console.log('false || true' + ' =', lo);

lo = false || false;
console.log('false || false' + ' =', lo);

console.log('</LogicalOperators>');
console.log('');

console.log('<Comparison>');
var lo;

lo = 1 > 2;
console.log('1 > 2' + ' =', lo);

lo = 1 < 2;
console.log('1 < 2' + ' =', lo);

lo = 1 == 2;
console.log('1 == 2' + ' =', lo);

lo = 1 == 1;
console.log('1 == 1' + ' =', lo);

lo = 1 === 1;
console.log('1 === 1' + ' =', lo);

lo = 1 === '1';
console.log('1 === "1"' + ' =', lo);

lo = 1 != 2;
console.log('1 != 2' + ' =', lo);

lo = 1 !== '2';
console.log('1 != "2"' + ' =', lo);

lo = 1 != 2;
console.log('1 != 2' + ' =', lo);

lo = 1 >= 2;
console.log('1 >= 2' + ' =', lo);

lo = 1 <= 2;
console.log('1 <= 2' + ' =', lo);

console.log('</Comparison>');
console.log('');

console.log('<Arrays>');

var a1, a2, a3, a4, a5;

a1 = [];
console.log('a1 is typof', typeof (a1));

a1 = ['js', 'is', 'amazing'];
console.log('add values to the array', a1);

console.log('number of values in an array', a1.length);

console.log('the first value is', a1[0]);

console.log('the last value is', a1[a1.length - 1]);

a1.pop(0);
console.log('remove the last value -', a1);

a1.shift();
console.log('remove the first value -', a1);

a1.unshift('javascript');
console.log('add new value to the front -', a1);

a1.push('super', 'awesome');
console.log('add new value to the end -', a1);

a2 = a1.lastIndexOf("super");
console.log('Find the position of super -', a2);

a1[a2] = 'f#ck@%*'
console.log('Replace the the value of super -', a1);

a1.sort();
console.log('sort the array -', a1);

a1.reverse();
console.log('reverse the array -', a1);

a3 = a1.slice(0, 2);
console.log('remove the first two values -', a3);

a4 = a1.slice(2);
console.log('remove the last two values -', a4);

a1 = a3.concat(a4);
console.log('glue the rwo arrays together -', a1);

a1 = a1.join(' ');
console.log('join the rwo arrays -', a1);

console.log('</Arrays>');
console.log('');

console.log('<ifElse>');

var ie1 = true,
  ie2 = 'blue',
  ie3;

// simple if, and if the value is fasle we can do something else
if (ie1) {
    // lets do someting
    console.log('ie1 is true');
} else {
    // so its false lets do something else
    console.log('ie1 is false');
}

// if its false, if its false again do something anyway
if (ie2 === 'green') {
    console.log('ie2 is green');
} else if (ie2 === 'red') {
    console.log('ie2 is red');
} else {
    console.log('ie2 is not green or red its', ie2);
};

// if shorthand
ie3 = (ie2 === 'blue') ? 'Yes ie2 is blue' : 'No ie2 not blue'
console.log(ie3);

console.log('</ifElse>');
console.log('');

console.log('<VariableExists>');

var cv1 = "",
    cv2 = 123,
    cv3 = undefined;
cv4 = 'hellow world';

if (cv1) {
    console.log('yes the cv1 variable exists');
} else {
    console.log('there is no cv1 variable', cv1);
};

if (typeof cv1 !== 'undefined') {
    console.log('typeof cv1 is not "undefined"');
} else {
    console.log('typeof cv1 is "undefined"');
};

if (typeof cv2 !== 'undefined') {
    console.log('typeof cv2 is not "undefined"');
} else {
    console.log('typeof cv2 is "undefined"');
};

if (typeof cv3 !== 'undefined') {
    console.log('typeof cv3 is not "undefined"');
} else {
    console.log('typeof cv3 is "undefined"');
};

if (typeof cv4 !== 'undefined') {
    console.log('typeof cv4 is not "undefined"');
} else {
    console.log('typeof cv4 is "undefined"');
};

console.log('</VariableExists>');
console.log('');

console.log('<switch>');

var s1 = 'ferrari',
    s2 = 'lamborghini',
    s3;

// case is like asking a quesion
switch (s1) {
    case 'audi':
        s3 = 'audi is not my favourite car';
        break;

    case s2:
        s3 = 's2 (lamborghini) is not my favourite car';
        break;

    default:
        s3 = 'my favourite car is a ' + s1;
        break;
}

console.log(s3);

console.log('</switch>');
console.log('');

console.log('<loops>');

var l1 = ['html', 'js', 'css', 'php'],
  count;

console.log('while Loop:');
count = 0;


while (count < l1.length) {
    console.log('while loop count', count + ' ' + l1[count]);
    count++;
}


console.log('do-while Loop:');
count = 0;
do {
    console.log('do-while loop count', count + ' ' + l1[count]);
    count++;
} while (count < l1.length);


console.log('for Loop:');
count = 0;
for (var count = 0; count < l1.length; count++) {
    console.log('for loop count', count + ' ' + l1[count]);
};


console.log('for-in Loop:');
count = 0;
for (count in l1) {
    console.log('for in loop count', count + ' ' + l1[count]);
}

console.log('</loops>');
console.log('');