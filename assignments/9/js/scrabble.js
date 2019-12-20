/*******************************************************************************
**    File: scrabble.js                                                       **
**                                                                            **
**    91.461 Assignment 9: Implementing a Bit of Scrabble with Drag-and-Drop  **
**                                                                            **
**    Victor M Espaillat, UMass Lowell Computer Science,                      **
**    victor_espaillat@student.uml.edu                                        **
*******************************************************************************/
var debugging = false;

if (debugging) console.log(strTileImgDir);
var ObjScrabble = {};

/** DICTIONARY SETUP **********************************************************/
ObjScrabble.dictTiles = [];
ObjScrabble.dictTiles['A'] = { 'value': 1,  'freq' : 9,  'quantity' : 9 };
ObjScrabble.dictTiles['B'] = { 'value': 3,  'freq' : 2,  'quantity' : 2 };
ObjScrabble.dictTiles['C'] = { 'value': 3,  'freq' : 2,  'quantity' : 2 };
ObjScrabble.dictTiles['D'] = { 'value': 2,  'freq' : 4,  'quantity' : 4 };
ObjScrabble.dictTiles['E'] = { 'value': 1,  'freq' : 12, 'quantity' : 12};
ObjScrabble.dictTiles['F'] = { 'value': 4,  'freq' : 2,  'quantity' : 2 };
ObjScrabble.dictTiles['G'] = { 'value': 2,  'freq' : 3,  'quantity' : 3 };
ObjScrabble.dictTiles['H'] = { 'value': 4,  'freq' : 2,  'quantity' : 2 };
ObjScrabble.dictTiles['I'] = { 'value': 1,  'freq' : 9,  'quantity' : 9 };
ObjScrabble.dictTiles['J'] = { 'value': 8,  'freq' : 1,  'quantity' : 1 };
ObjScrabble.dictTiles['K'] = { 'value': 5,  'freq' : 1,  'quantity' : 1 };
ObjScrabble.dictTiles['L'] = { 'value': 1,  'freq' : 4,  'quantity' : 4 };
ObjScrabble.dictTiles['M'] = { 'value': 3,  'freq' : 2,  'quantity' : 2 };
ObjScrabble.dictTiles['N'] = { 'value': 1,  'freq' : 6,  'quantity' : 6 };
ObjScrabble.dictTiles['O'] = { 'value': 1,  'freq' : 8,  'quantity' : 8 };
ObjScrabble.dictTiles['P'] = { 'value': 3,  'freq' : 2,  'quantity' : 2 };
ObjScrabble.dictTiles['Q'] = { 'value': 10, 'freq' : 1,  'quantity' : 1 };
ObjScrabble.dictTiles['R'] = { 'value': 1,  'freq' : 6,  'quantity' : 6 };
ObjScrabble.dictTiles['S'] = { 'value': 1,  'freq' : 4,  'quantity' : 4 };
ObjScrabble.dictTiles['T'] = { 'value': 1,  'freq' : 6,  'quantity' : 6 };
ObjScrabble.dictTiles['U'] = { 'value': 1,  'freq' : 4,  'quantity' : 4 };
ObjScrabble.dictTiles['V'] = { 'value': 4,  'freq' : 2,  'quantity' : 2 };
ObjScrabble.dictTiles['W'] = { 'value': 4,  'freq' : 2,  'quantity' : 2 };
ObjScrabble.dictTiles['X'] = { 'value': 8,  'freq' : 1,  'quantity' : 1 };
ObjScrabble.dictTiles['Y'] = { 'value': 4,  'freq' : 2,  'quantity' : 2 };
ObjScrabble.dictTiles['Z'] = { 'value': 10, 'freq' : 1,  'quantity' : 1 };
ObjScrabble.dictTiles['_'] = { 'value': 0,  'freq' : 2,  'quantity' : 2 };
ObjScrabble.size = Object.keys(ObjScrabble.dictTiles).length;
if (debugging) console.log('ObjScrabble.size: ', ObjScrabble.size);
/* END DICTIONARY SETUP */

/** BAG SETUP *****************************************************************/
ObjScrabble.bag = [];
for (var key in ObjScrabble.dictTiles) {
    for (var i = 0; i < ObjScrabble.dictTiles[key].quantity; ++i) {
        ObjScrabble.bag.push( key );
    }
}
if (debugging) console.log('bag.length: ', ObjScrabble.bag.length);
if (debugging) console.log(ObjScrabble.bag);
/* END BAG SETUP */

/*******************************************************************************
 * Returns a random letter from the bag
 * Removes that letter from the bag
 * Decrements the letter's quantity in the dictionary.
 ******************************************************************************/
ObjScrabble.getRandLett = function () {
    if (this.bag.length < 1)
        return null;
    var randIndex = Math.floor(Math.random() * this.bag.length);
    var strLetter = this.bag.splice(randIndex,1);
    this.dictTiles[strLetter].quantity--;
    // if (debugging) console.log(strLetter + ' : ' + this.dictTiles[strLetter].quantity);
    return strLetter;
}

// for (i = 0; i < 105; ++i) {
//     if (ObjScrabble.getRandLett() == null)
//         console.log('null');
//     // console.log(bjScrabble.getRandLett());
//     // console.log('bag.length: ', ObjScrabble.bag.length);
// }