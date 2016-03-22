$(document).ready(function () {
    var currentDate = new Date(),
        month = currentDate.getMonth() + 1,
        day = currentDate.getDate(),
        year = currentDate.getFullYear();
    // Reset to get 00:00:00
    currentDate = new Date(month + ' ' + day + ' ' + year);
    var smallDateRegex = /^[\s]*[\d]{1,2}[\s]+[a-zA-Z]{1,15}[\s]*$/;
    
    // trello date badge classes
    // is-due-past, is-due-now, is-due-soon, is-due-future
    var trelloBoard = $('#board');
    trelloBoard.find('.is-due-past').css('background-color', 'green');
    trelloBoard.find('.is-due-now').css('background-color', 'blue');
    trelloBoard.find('.is-due-soon').css('background-color', 'yellow');
    trelloBoard.find('.is-due-future').css('background-color', 'purple');
    console.log(month + ' ' + day + ' ' + year);
    var dates = trelloBoard.find('[class*="is-due-"]').find('.badge-text').text();
    var badges = []
    trelloBoard.find('[class*="is-due-"]').each(function (index, obj) {
        badges.push($(this));
        var trelloDate = $(this).find('.badge-text').text();
        if (trelloDate.match(smallDateRegex)) {
            trelloDate += ' ' + currentDate.getFullYear();
        }
        console.log(trelloDate);
        // Modified, Credit to @(http://stackoverflow.com/a/3224854)
        var timeDiff = new Date(trelloDate).getTime() - currentDate.getTime();
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        console.log(diffDays);
    });
});