/*******************************************************************************
**    File: main.js                                                           **
**                                                                            **
**    91.461 Assignment 8: Using the jQuery UI Slider and Tab Widgets         **
**                                                                            **
**    Victor M Espaillat, UMass Lowell Computer Science,                      **
**    victor_espaillat@student.uml.edu                                        **
*******************************************************************************/

var debugging = true;

/* When the page is ready, the function inside the parentheses of the .ready()
   method is run. */
$(document).ready(function() {

    // Initialize input fields with some values.
    if (debugging) {
        var i = 0,
            vals = [-10,10,-10,10];
        $('input').each(function() {
            $(this).val(vals[i]);
            i++;
        });
    }

    /**************************** Form Validation *****************************/
    // Set up form validation.
    $form = $('form');
    $form.validate({
        highlight: function(element) {
            $(element).removeClass('input-valid').addClass('input-error');
        },

        unhighlight: function(element) {
            $(element).removeClass('input-error').addClass('input-valid');
        }
    });

    // Add these rules to each input.
    $inputs = $('input');
    $inputs.each(function() {
        $(this).rules('add', {
            required: true,
            range: [-50,50]
        });
    });

    // On click of the button, if the form is valid, generate the table.
    $('button').on('click', function(e) {
        e.preventDefault();
        if ($form.valid())
            generateTable();
    });

    /********************************* Slider *********************************/
    $('.slider')
        .slider({
            max: 10,
            min: -10,
            slide: function(event, ui) {
                var $input = $(this).parent().children('input');
                $input.val(ui.value);
                if ($input.valid()) {
                    generateTable();
                }
            }
        })
        .css({
            'display': 'inline-block',
            'width': 0.9*parseInt( $inputs.width(), 10 ),
            'margin-bottom': '1em'
        });

    $('input').on('change', function() {
        if ( $.isNumeric( $(this).val() ) ) {
            $(this).parent().children('.slider').slider( "value", $(this).val() );
            generateTable();
        }
    });

    $('button').trigger('click');

});

/*
 * Collects the values from the input fields and fills the content of
 *
 */
function generateTable() {

    var arr_valid_inputs = [],
        i, j;

    // Push each of the input values into array.
    $('input').each(function() {
        arr_valid_inputs.push(  parseInt( $(this).val(), 10 )  );
    });

    if (debugging) {
        for (i = 0; i < arr_valid_inputs.length; ++i)
            console.log(arr_valid_inputs[i]);
    }

    // Sort pairs
    arr_valid_inputs = sort_pairs(arr_valid_inputs);

    /* Store a reference of the table object inside a variable since it will be
       used multiple times. */
    var $table = $('table');
    // var $tabDiv = $table.parent();

    $table.empty()              // Clear the table.

    // $tabDiv.css({
    //     'opacity': '0.0',       // Make it transparent.
    //     'padding-left': '500px' // Push it to the right.
    // });

    var $row = $('<tr>');       // Create an empty table row element.
    $row.append('<th>');        // Append an empty table header element.

    // Generate the multipliers row
    for (var i = arr_valid_inputs[0]; i <= arr_valid_inputs[1]; ++i) {
        $row.append('<th>' + i + '</th>');
    }
    $table.append($row);        // Append row to table.

    // Generate the rest of the table, row by row
    for (var j = arr_valid_inputs[2]; j <= arr_valid_inputs[3]; ++j) {

        /* Create another empty table row element and store it in the same
           variable. The variable now refences this new element, and not the old
           one anymore. */
        $row = $('<tr>');

        // Start each row with the respective multiplicand.
        $row.append('<th>' + j + '</th>');

        // Generate the products between multipliers and multiplicands.
        for (var i = arr_valid_inputs[0]; i <= arr_valid_inputs[1]; ++i) {
            $row.append('<td>' + (j*i) + '</td>');
        }
        $table.append($row);    // The row is ready to be added to the table.

    }

    // If already animating, stop and animate from the beginning again.
    // $tabDiv.stop(true).animate({
    //     opacity: 1.0,           // Make visible
    //     paddingLeft: '-=500'    // Slide from right by decreasing left padding.
    // }, 500);

}

/*
 * Returns a given array where the first and second number are sorted in
 * ascending order, the third and fourth number as well, and so on.
 *
 * @param   arr     array containing an even number of integers.
 * @return          array with sorted pairs.
 */
function sort_pairs(arr) {

    for (var i = 0; i < arr.length; i+=2) {
        if (arr[i] > arr[i+1]) {
            [arr[i+1], arr[i]] = [arr[i], arr[i+1]];
        }
    }

    return arr;

}