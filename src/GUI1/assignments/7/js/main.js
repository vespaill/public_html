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

/* When the page is ready, the function inside the parentheses of the .ready()
   method is run. */
$(document).ready(function() {

    // Initialize input fields.
    var i = 0,
        vals = [5,1,4,2];
    $('input').each(function() {
        $(this).val(vals[i]);
        i++;
    })

    // Set up form validation
    $form = $('form');
    $form.validate({
        highlight: function(element) {
            // $(element).fadeOut().fadeIn();
            $(element).removeClass('input-valid').addClass('input-error');
        },

        unhighlight: function(element) {
            $(element).removeClass('input-error').addClass('input-valid');
        }
    });

    // Add these rules to each input.
    $('input').each(function() {
        $(this).rules('add', {
            required: true,
            range: [-50,50]
        });
    });

    $('button').on('click', function(e) {
        e.preventDefault();
        if ($form.valid())
            generateTable();
    })
});

function generateTable() {

    var arr_valid_inputs = [],
        i, j;

    // Push each of the input values into arr.
    $('input').each(function() {
        arr_valid_inputs.push(  parseInt( $(this).val(), 10 )  );
    });

    for (i=0; i < arr_valid_inputs.length; ++i)
        console.log(arr_valid_inputs[i]);

    // Sort pairs
    arr_valid_inputs = sort_pairs(arr_valid_inputs);

    /* Store a reference of the table object inside a variable since it will be
       used often. */
    var $table = $('#mult-table');
    var $tabDiv = $table.parent();

    $table.empty()

    $tabDiv.css({
        'opacity': '0.0',
        'padding-left': '500px'
    });

    var $row = $('<tr>');       // Create an empty table row element
    $row.append('<th>');        // Append an empty table header element

    // Generate the multipliers row
    for (var i = arr_valid_inputs[0]; i <= arr_valid_inputs[1]; ++i) {
        $row.append('<th>' + i + '</th>');
    }
    $table.append($row);        // Append row to table

    // Generate the rest of the table, row by row
    for (var j = arr_valid_inputs[2]; j <= arr_valid_inputs[3]; ++j) {

        $row = $('<tr>');       // Create another empty table row element

        // Start each row with the respective multiplicand.
        $row.append('<th>' + j + '</th>');

        // Generate the products between multipliers and multiplicands.
        for (var i = arr_valid_inputs[0]; i <= arr_valid_inputs[1]; ++i) {
            $row.append('<td>' + (j*i) + '</td>');
        }
        $table.append($row);    // Append row to table

    }
    $tabDiv.stop(true).animate({
        opacity: 1.0,
        paddingLeft: '-=500'
    }, 500);

}

function sort_pairs(arr) {

    for (var i = 0; i < arr.length; i+=2) {
        if (arr[i] > arr[i+1]) {
            [arr[i+1], arr[i]] = [arr[i], arr[i+1]];
        }
    }

    return arr;

}