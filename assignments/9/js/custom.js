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
const RACK_MAX_TILES = 7;
var totalScore = 0;

$(document).ready(function() {
    ObjScrabble.init();

    /** Generate board **/
    var $blank = $('<div>').addClass('board-blank slot droppable ui-widget-header')
                           .attr('letter-mult', 1)
                           .attr('word-mult', 1);
    var $doublew = $blank.clone()
                         .addClass('board-double-word')
                         .removeClass('board-blank')
                         .attr('word-mult', 2);
    var $doublel = $blank.clone()
                         .addClass('board-double-letter')
                         .removeClass('board-blank')
                         .attr('letter-mult', 2);
    var k = 0;
    $('#board')
        .append($blank.clone().attr('col', k++))
        .append($doublew.clone().attr('col', k++))
        .append($blank.clone().attr('col', k++))
        .append($doublel.clone().attr('col', k++))
        .append($blank.clone().attr('col', k++))
        .append($doublew.clone().attr('col', k++))
        .append($blank.clone().attr('col', k++));

    /** Draw tiles to rack **/
    drawHand();

    /** Make tiles draggable **/
    makeTilesDraggable();

    /** Allow the dropping of tiles into the board slots **/
    $('.slot').droppable({
        tolerance: 'intersect',
        hoverClass: 'drop-hover',
        drop: function (event, ui) {
            var $this = $(this);
            if ( $this.children().length == 0 ) {
                ui.draggable
                    .detach()
                    .css({top: 0, left: 0})
                    .addClass('drawn')
                    .appendTo($this);

                refreshScoreBoard();
            }
        }
    });

    /** Allow the dropping of tiles back into the rack **/
    $('#rack').droppable({
        accept: '.drawn',
        tolerance: 'intersect',
        hoverClass: 'drop-hover',
        drop: function (e, ui) {
            ui.draggable.detach()
                        .removeClass('drawn')
                        .css({top:0, left:0})
                        .appendTo($(this));
            refreshScoreBoard();
        }
    });

    $('#reset').on('click', function(e) {
        e.preventDefault();
        ObjScrabble.init();
        clearBoard();
        clearRack();
        drawHand();
        makeTilesDraggable();
        refreshScoreBoard();
        totalScore = 0;
        $('#total-score').text(totalScore);
    })

    $('#next-word').on('click', function(e) {
        e.preventDefault();
        clearBoard();
        drawHand();
        makeTilesDraggable();

        var cur_score = parseInt($('#cur-score').text(), 10);
        totalScore += cur_score;
        $('#total-score').text(totalScore);

        refreshScoreBoard();
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
    $('#cur-score').text(score*wordMult);
    $('#bag').text(ObjScrabble.bag.length);

}

function clearBoard() {
    $('#board').children().children().each(function() {
        $(this).remove();
    });
}

function clearRack() {
    $('#rack').children().each(function() {
        $(this).remove();
    });
}

function drawHand() {
    var $rack = $('#rack');
    var $tile = $('<img>').addClass('tile draggable ui-widget-content');
    var i = $rack.children().length;
    for (; i < RACK_MAX_TILES; ++i) {
        var key = ObjScrabble.drawTileFromBag();
        var strSrc = 'images/tiles/Scrabble_Tile_' + key + '.jpg';
        var $newTile = $tile.clone()
                            .attr('value', ObjScrabble.dictTiles[key].value)
                            .attr('letter', key)
                            .attr('src', strSrc)
                            .appendTo('#rack');
    }
}

function makeTilesDraggable() {
    $('.tile').draggable({
        revert: true,
        revertDuration: 100,
        scroll: false,
        start: function (e, ui) {
            $(this).addClass('hovering');
        },
        stop: function (e, ui) {
            $(this).removeClass('hovering');
        }
    });
}