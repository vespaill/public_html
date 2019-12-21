/*******************************************************************************
**    File: custom.js                                                         **
**                                                                            **
**    91.461 Assignment 9: Implementing a Bit of Scrabble with Drag-and-Drop  **
**                                                                            **
**    Victor M Espaillat, UMass Lowell Computer Science,                      **
**    victor_espaillat@student.uml.edu                                        **
*******************************************************************************/

'use strict'

var debugging = false;

$(document).ready(function() {

    // Generate board
    var $blank = $('<div>').addClass('board-blank slot droppable ui-widget-header')
                           .attr('letter-mult', 1)
                           .attr('word-mult', 1);

    var $doublew = $blank.clone().addClass('board-double-word').removeClass('board-blank');
    var $doublel = $blank.clone().addClass('board-double-letter').removeClass('board-blank');
    $doublew.attr('word-mult', 2);
    $doublel.attr('letter-mult', 2);
    var k = 0;
    $('#board')
        .append($blank.clone().attr('col', k++))
        .append($doublew.clone().attr('col', k++))
        .append($blank.clone().attr('col', k++))
        .append($doublel.clone().attr('col', k++))
        .append($blank.clone().attr('col', k++))
        .append($doublew.clone().attr('col', k++))
        .append($blank.clone().attr('col', k++));

    // Generate rack
    var RACK_NUM_TILES = 7, i;
    var $rack = $('#rack');
    var $tile = $('<img>').addClass('tile draggable ui-widget-content');
    for (i = 0; i < RACK_NUM_TILES; ++i) {
        var $newTile = $tile.clone();
        var key = ObjScrabble.getRandLett();
        $newTile.attr('value', ObjScrabble.dictTiles[key].value)
                .attr('letter', key);
        var strSrc = 'images/tiles/Scrabble_Tile_' + key + '.jpg';
        if (debugging) console.log(strSrc);
        $newTile.attr('src', strSrc)
        $('#rack').append($newTile);
    }

    $('.tile').draggable({
        revert: true,
        revertDuration: 100,
        start: function (e, ui) {
            $(this).addClass('hovering');
        },
        stop: function (e, ui) {
            $(this).removeClass('hovering');
        }
    });

    $('.slot').droppable({
        tolerance: 'intersect',
        hoverClass: 'drop-hover',
        drop: function (event, ui) {
            var $this = $(this);
            if ( $this.children().length == 0 ) {
                ui.draggable
                    .detach()
                    .css({top: 0,left: 0})
                    .addClass('drawn')
                    .appendTo($this);

                refreshScoreBoard();
            }
        }
    });

    $('#rack').droppable({
        accept: '.drawn',
        tolerance: 'intersect',
        hoverClass: 'drop-hover',
        drop: function (e, ui) {
            var $this = $(this);
            ui.draggable.detach().removeClass('drawn').css({top:0, left:0}).appendTo($this);
            refreshScoreBoard();
        }
    });
refreshScoreBoard();
});

function refreshScoreBoard() {

    var strWord = "";
    var score = 0;
    var letterVal;
    var letterMult = 1;
    var wordMult = 1;

    $('.drawn').each(function(){
        var $this = $(this)
        strWord += $this.attr('letter');

        letterVal = parseInt($this.attr('value'), 10);
        letterMult = parseInt($this.parent().attr('letter-mult'), 10);

        score += (letterVal * letterMult);
        wordMult *= parseInt($this.parent().attr('word-mult'), 10);
    });

    $('#word').text(strWord);
    $('#score').text(score*wordMult);
    $('#bag').text(ObjScrabble.bag.length);

}