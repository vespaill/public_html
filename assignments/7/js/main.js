/*******************************************************************************
**    File: main.js                                                           **
**                                                                            **
**    91.461 Assignment 7: Using the jQuery Validation Plugin with Your       **
**                         Dynamic Table                                      **
**                                                                            **
**    Victor M Espaillat, UMass Lowell Computer Science,                      **
**    victor_espaillat@student.uml.edu                                        **
*******************************************************************************/

var debugging = true;

$(document).ready(function() {

   jQuery.validator.setDefaults({
        success:  "valid"
    });

    var form = $("#group-form");
    form.validate({
        rules: {
            num_field: {
                required: true,
                digits: true
            }
        }
    });

    $("#submit-btn").on('click', function() {
        if (form.valid() == true ) {
            generateTable();
        }
    });

});

function generateTable() {

    var arr_valid_inputs = [];

    // Push each of the inputs into arr.
    $('input').each(function() {
        arr_valid_inputs.push(  parseInt( $(this).val(), 10 )  );
    });

    console.log(arr_valid_inputs);

    // $('#mult-table').append()


}