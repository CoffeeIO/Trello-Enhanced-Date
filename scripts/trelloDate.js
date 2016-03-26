$(document).ready(function () {
  function loadSettings() {
    chrome.storage.sync.get({
      dateColor: ''
    }, function (items) {
      var loadArr = items.dateColor;
      console.log(loadArr);
      console.log(Object.keys(loadArr));
      var arrSorted = sortIntArray(Object.keys(loadArr));
      console.log("Post-sort " + arrSorted);
      
      applyDateEnchance(loadArr, arrSorted);
    });
  }

  var trelloBoard = $('#board'),
      currentDate = new Date(),
      month = currentDate.getMonth() + 1,
      day = currentDate.getDate(),
      year = currentDate.getFullYear(),
      smallDateRegex = /^[\s]*[\d]{1,2}[\s]+[a-zA-Z]{1,15}[\s]*$/;

  // Overwrite to get day to --> 00:00:00
  currentDate = new Date(month + ' ' + day + ' ' + year);
  
  function applyDateEnchance(settingsMap, sortedKeys) {
    trelloBoard.find('[class*="is-due-"]').each(function (index, obj) {
      var ele = $(this);
      var trelloDate = ele.find('.badge-text').text();
      ele.css('background-color', '#fff'); // Overwrite all cards w/ default color
      if (trelloDate.match(smallDateRegex)) {
        trelloDate += ' ' + currentDate.getFullYear();
      }
      // Modified, Credit to @(http://stackoverflow.com/a/3224854)
      var timeDiff = currentDate.getTime() - new Date(trelloDate).getTime();
      var diffDays = Math.ceil(timeDiff / (86400000)); // 1000 * 60 * 60 * 24
      
      sortedKeys.forEach(function (key) {
        console.log("compare --> " + key + " to " + diffDays);
        if (key <= diffDays) {
          var arr = JSON.parse(settingsMap[key]);
          console.log("color --> " + arr.color);
          console.log("textcolor --> " + arr.textColor);
          ele.css('background-color', arr.color);
          ele.css('color', arr.textColor);
        }
      });
      
      console.log(trelloDate);
      console.log(diffDays);
    });
    
  }
  
  loadSettings();  
  

  // Trello date badge classes
  // is-due-past, is-due-now, is-due-soon, is-due-future

  
});