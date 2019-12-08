/*******************************************************************************
**    File: main.js                                                           **
**                                                                            **
**    91.461 Assignment: Generating an Interactive Dynamic Table              **
**                                                                            **
**    Victor M Espaillat, UMass Lowell Computer Science,                      **
**    victor_espaillat@student.uml.edu                                        **
*******************************************************************************/

var inputs = [];       // multiplier1, multiplier2, multiplicand1, multiplicand2
var plier_range = [];  // Multipliers, top row of table.
var cand_range = [];   // Multiplicands, leftmost column of table.

/*******************************************************************************
**    Attempts to retrive a given number of inputs and store them in          **
**    a global inputs array.                                                  **
**                                                                            **
**    Determines whether the given inputs are valid by returning              **
**    true or false.                                                          **
**                                                                            **
**    Writes error messages to an empty element "hidden_error#"               **
**                                                                            **
**    Assumes that the inputs come from elements with IDs of "input#"         **
**    where # is an integer between 1 and num_inputs.                         **
*******************************************************************************/
function validate(num_inputs) {
    console.log("validate(num_inputs = " + num_inputs + ");");

    inputs = [];            // Reset globals.
    var inputValid = [];    // To know which hidden error element to reveal.
    var valid = true;       // Return value

    /******************* Data retrieval and validation ************************/
    var i, curVal;
    for (i = 0; i < num_inputs; i++) {
        curVal = parseFloat(document.getElementById("input" + (i+1)).value);
        console.log("curVal" + i + ": " + curVal);
        // Make sure input is not "NaN" or a float, but rather a proper integer.
        if (Number.isInteger(curVal)) {
            inputValid.push(true);
            inputs.push(curVal);
        } else {
            inputValid.push(false);
            /* If any one input is invalid, then the set is useless for our
               multiplication table, thus validation should fail. */
            valid = false;
        }
    }

    /**************** Display error messages if necessary *********************/
    var hidden_el;
    for (i = 0; i < num_inputs; i += 2) {
        // Treat the inputs as pairs. Only display one message per pair.
        hidden_el = document.getElementById( "hidden_error" + ((i/2)+1) );
        if (inputValid[i] && inputValid[i+1]) {
            // If input is valid, clear any previously written error messages.
            hidden_el.innerHTML = "<br>";
        } else {
            // Otherwise, write an error message.
            hidden_el.innerHTML = "<mark class=\"px-3\">invalid input !</mark>";
        }
    }
    return valid;
}

/*******************************************************************************
**    If the numbers read from a form are valid:                              **
**                                                                            **
**    Uses them to generate a multiplication table. Displays the              **
**    table at a desired location, as indicated by an element ID.             **
*******************************************************************************/
function generateTable(num_inputs) {
    /************************** Resetting globals *****************************/
    plier_range = [];
    cand_range = [];

    /******************* Making sure the inputs are valid *********************/
    if (!validate(num_inputs)) {
        console.log("Failed validation :(");
        return;
    }
    console.log("Validatation successful\nGenerating Table");

    /*********** Inserting the validated inputs into range arrays *************/
    plier_range.push(inputs[0]);
    plier_range.push(inputs[1]);
    cand_range.push(inputs[2]);
    cand_range.push(inputs[3]);

    /******* If given in incorrect order, re-arrange the input numbers ********/
    if (plier_range[0] > plier_range[1])
        [plier_range[1], plier_range[0]] = [plier_range[0], plier_range[1]];
    if (cand_range[0] > cand_range[1])
        [cand_range[1], cand_range[0]] = [cand_range[0], cand_range[1]];

    /* Printing the input numbers out using the browser console to ensure that
       I'm reading them correctly. */
    console.log("Multipliers: [" + plier_range + "]");
    console.log("Multiplicands: [" + cand_range + "]");

    /********************** Generate the multpliers row ***********************/
    var i, j, table_html;
    table_html = "<tr><th></th>";
    for (i = plier_range[0]; i <= plier_range[1]; ++i){
        table_html += "<th class=\"align-middle\">" + i + "</th>";
    }
    table_html += "</tr>";

    /********************* Generate the rest of the rows **********************/
    for (j = cand_range[0]; j <= cand_range[1]; ++j) {
        table_html += "<tr><th class=\"align-middle\">" + j + "</th>";
        for (i = plier_range[0]; i <= plier_range[1]; ++i) {
            table_html += "<td class=\"align-middle\">" + (i*j) + "</td>";
        }
        table_html += "</tr>";
    }

    // Insert the HTML we generated for our table into the desired element.
    document.getElementById("mult-table").innerHTML = table_html;
}