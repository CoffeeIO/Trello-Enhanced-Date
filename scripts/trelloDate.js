$(document).ready(function () {
    // Current date
    var d = new Date(),
        month = d.getMonth() + 1,
        day = d.getDate(),
        year = d.getYear();
    
    // trello date badge classes
    // is-due-past, is-due-now, is-due-soon, is-due-future
    var trelloBoard = $('#board');
    trelloBoard.find('.is-due-past').css('background-color', 'green');
    trelloBoard.find('.is-due-now').css('background-color', 'blue');
    trelloBoard.find('.is-due-soon').css('background-color', 'yellow');
    trelloBoard.find('.is-due-future').css('background-color', 'purple');
});