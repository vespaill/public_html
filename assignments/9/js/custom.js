/*******************************************************************************
**    File: custom.js                                                         **
**                                                                            **
**    91.461 Assignment 9: Implementing a Bit of Scrabble with Drag-and-Drop  **
**                                                                            **
**    Victor M Espaillat, UMass Lowell Computer Science,                      **
**    victor_espaillat@student.uml.edu                                        **
*******************************************************************************/

"use strict"

var debugging = false;

$(document).ready(function() {

    // Generate strip
    var $blank = $('<div>').addClass('board-blank droppable ui-widget-header');
    var $double = $blank.clone().addClass('board-double').removeClass('board-blank');

    $('#strip')
        .append($blank.clone())
        .append($double.clone())
        .append($blank.clone())
        .append($blank.clone())
        .append($blank.clone())
        .append($double.clone())
        .append($blank.clone());

    // Generate rack
    var RACK_NUM_TILES = 6, i;
    var $rack = $('#rack');
    var $tile = $('<div>').addClass('draggable ui-widget-content');

    for (i = 0; i < RACK_NUM_TILES; ++i) {
        var $newTile = $tile.clone();
        var url = "url('images/tiles/Scrabble_Tile_" + ObjScrabble.getRandLett() + ".jpg')";
        if (debugging) console.log(url);
        $newTile.css({
            'background-image': url,
            'background-size': 'contain',
        });
        $('#rack').append($newTile);
    }

    $(".draggable").draggable({
        scroll: false,
        revert: true,
        revertDuration: 200,
        start: function() {
            $(this).css("z-index", 2);
        },
        stop: function() {
            $(this).css("z-index", 1);
        },
    });

    $(".droppable").droppable({
        tolerance: "intersect",
        hoverClass: "drop-hover",
        drop: function(e, ui) {
            var $this = $(this);
            if ($this.children().length == 0)
                ui.draggable.detach().appendTo($this).addClass('drawn');
        },
    });

    $("#rack").droppable({
        accept: ".drawn",
        tolerance: "intersect",
        hoverClass: "drop-hover",
        drop: function(e, ui) {
            var $this = $(this);
            ui.draggable.removeClass('drawn').detach().appendTo($this);
        },
    });

});