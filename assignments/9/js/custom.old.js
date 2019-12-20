$(document).ready(function() {

    // Dragging-and-dropping one graphic (the source) to another (the target).
    $(".droppable").droppable({
        tolerance: "touch",
        drop: function(event, ui) {
            $this = $(this);
            $this.addClass('ui-state-highlight');
            $this.droppable('option', 'accept', ui.draggable);
            $(ui.draggable)
                .detach()
                .appendTo($this)
                .css({
                    position: 'absolute',
                    top: -2,
                    left: 0
                });
        },
        out: function(event, ui) {
            $(this).droppable('option', 'accept', '.draggable');
        }
    });

    $(".draggable").draggable({
        scroll: false,
        revert: true,
        snap: '.droppable',
        snapMode: 'inner'
        // helper: 'clone'
    });

});