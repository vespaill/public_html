/*
File: index.html
91.461 Assignment: Creating an Interactive Dynamic Table
Victor M Espaillat, UMass Lowell Computer Science, victor_espaillat@student.uml.edu
*/


var multiplicand_start = 1;
var multiplicand_end = 4;

var multiplier_start = 3;
var multiplier_end = 5;

var multiplicand = [];
var multiplier = [];

var i, j;

for (i = multiplier_start; i <= multiplier_end; ++i) {
    multiplier.push(i);
}

for (i = multiplicand_start; i <= multiplicand_end; ++i) {
    multiplicand.push(i);
}

console.log(multiplicand);
console.log(multiplier);

var el = document.getElementById('table');
var msg = '<p>&emsp;&nbsp;';

for (i = 0; i < multiplicand.length; ++i)
    msg += multiplicand[i] + '&emsp;';
msg += '<br>';

for (i = 0; i < multiplier.length; ++i) {
    msg += multiplier[i] + '&emsp;';
    for (j = 0; j < multiplicand.length; ++j) {
        msg += multiplier[i] * multiplicand[j] + '&emsp;';
    }
    msg += '<br>';
}


msg += '</p>';
el.innerHTML = msg;
