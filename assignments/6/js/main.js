/*
File: main.js
91.461 Assignment: Creating an Interactive Dynamic Table
Victor M Espaillat, UMass Lowell Computer Science, victor_espaillat@student.uml.edu
*/

var inputs = [];   // plier1, plier2, cand1, cand2
var valid = true;

function validate(num_inputs) {
    inputs = [];
    valid = true;

    console.log("validate(" + num_inputs + ")");

    // Get the value of the input fields.
    var i;
    for (i = 1; i <= num_inputs; ++i){
        // The ith hidden message element.
        el = document.getElementById("msg" + i);

        // Retrieve value from form and store into a variable.
        inputs.push( parseInt(document.getElementById("input" + i).value, 10) );

        console.log(inputs[i-1]);
        if (isNaN(inputs[i-1])) {
            el.innerHTML = "Integer required";
            valid = false;
        } else {
            el.innerHTML = "<br>";
        }
    }

    return valid;
}

var plier_range = []; // Multipliers, top row of table
var cand_range = [];  // Multiplicands, leftmost column of table

function generateTable(num_inputs) {

    plier_range = [];
    cand_range = [];

    if (validate(num_inputs)) {
        console.log("Great");

        plier_range.push(inputs[0]);
        plier_range.push(inputs[1]);
        cand_range.push(inputs[2]);
        cand_range.push(inputs[3]);

        if (plier_range[0] > plier_range[1])
            [plier_range[1], plier_range[0]] = [plier_range[0], plier_range[1]];

        if (cand_range[0] > cand_range[1]) {
            console.log(cand_range[0], cand_range[1]);

            [cand_range[1], cand_range[0]] = [cand_range[0], cand_range[1]];
        }

        console.log(plier_range);
        console.log(cand_range);

        var i, j, msg;

        /********************** The multpliers row ****************************/
        msg = "<thead><tr><th scope=\"col\"></th>";
        for (i = plier_range[0]; i <= plier_range[1]; ++i){
            msg += "<th scope=\"col\">" + i + "</th>";
        }
        msg += "</tr></thead><tbody>";

        /*********************** Every other row ******************************/
        for (j = cand_range[0]; j <= cand_range[1]; ++j) {
            msg += "</tr><th scope=\"row\">" + j + "</th>";
            for (i = plier_range[0]; i <= plier_range[1]; ++i) {
                msg += "<td>" + (i*j) + "</td>";
            }
            msg += "</tr>";
        } 
        msg += "</tbody>"

        document.getElementById("mult-tab").innerHTML = msg;

    } else {
        console.log(":(");
    }
}









//// for (i = 0; i < multiplier.length; ++i) {
////     msg += multiplier[i] + "&emsp;";
////     for (j = 0; j < multiplicand.length; ++j) {
////         msg += multiplier[i] * multiplicand[j] + "&emsp;";
////     }
////     msg += "<br>";
//// }



