/*
SALTY MESSENGER
Author: Matthew Wilson <mattsw@outlook.com>
version 0.1

Known Bugs:
    Decoder:
        - if the key is not alphabetic, the program will crash
*/

// Load JSON containing salted pairs aa-zz
const valuesByKey = require('./db/key_value_pairs.json');

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
var salty_alphabet = ""

// FUNCTIONS
function salty_encode(input) {
    var input_contains_letters = false;
    var salty_output = "";

    input = input.toLowerCase();

    var pair_x = ALPHABET.charAt(Math.floor(Math.random() * 26));
    var pair_y = ALPHABET.charAt(Math.floor(Math.random() * 26));
    var salty_pair = pair_x + pair_y;
    salty_alphabet = valuesByKey[salty_pair];

    for (var character = 0; character < input.length; character++) {
        var letter_found = false;

        for (var i = 0; i < 26; i++) {
            if (input.charAt(character) == ALPHABET.charAt(i)) {
                letter_found = true;
                input_contains_letters = true;
                salty_output += salty_alphabet.charAt(i);
                break;
            }
        }

        if (!letter_found) {
            salty_output += input.charAt(character);
        }
    }

    if (input_contains_letters) {
        return salty_pair + salty_output;
    }
    else {
        return salty_output;
    }
}

function salty_decode(input) {
    var salty_output = "";

    var salty_pair = input.substring(0, 2);
    salty_alphabet = valuesByKey[salty_pair];

    for (var character = 0; character < input.length; character++) {
        var letter_found = false;

        for (var i = 0; i < 26; i++) {
            if (input.charAt(character) == salty_alphabet.charAt(i)) {
                letter_found = true;
                input_contains_letters = true;
                salty_output += ALPHABET.charAt(i);
                break;
            }
        }

        if (!letter_found) {
            salty_output += input.charAt(character);
        }
    }

    return salty_output.substr(2, salty_output.length);
}

// MAIN
// const input = "Sphinx of Black Quartz: Judge My Vow!";
// console.log("Input:\t\t", input);

// const encoded = salty_encode(input);
// console.log("Encoded:\t", encoded);

// const decoded = salty_decode(encoded);
// console.log("Decoded:\t", decoded);
// console.log("\n");

module.exports = { valuesByKey, salty_alphabet, ALPHABET, salty_encode, salty_decode };