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