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
  function sortIntArray(arr) {
    var intArr = arr.map(Number);
    return intArr.sort();
  }
  
  var trelloBoard = $('#board');
  function applyDateEnchance(settingsMap, sortedKeys) {
    
    trelloBoard.find('[class*="is-due-"]').each(function (index, obj) {
      var ele = $(this);
      var trelloDate = ele.find('.badge-text').text();
      ele.css('background-color', '#c66b0f');
      if (trelloDate.match(smallDateRegex)) {
        trelloDate += ' ' + currentDate.getFullYear();
      }
      // Modified, Credit to @(http://stackoverflow.com/a/3224854)
      var timeDiff = currentDate.getTime() - new Date(trelloDate).getTime();
      var diffDays = Math.ceil(timeDiff / (86400000)); // 1000 * 60 * 60 * 24
      
      sortedKeys.forEach(function (key) {
        if (key <= diffDays) {
          console.log("color --> " + settingsMap[key]);
          ele.css('background-color', '#' + settingsMap[key]);
        }
      });
      
      console.log(trelloDate);
      console.log(diffDays);
    });
    
  }
  
  loadSettings();  
  
  var currentDate = new Date(),
      month = currentDate.getMonth() + 1,
      day = currentDate.getDate(),
      year = currentDate.getFullYear();
  // Overwrite to get day to --> 00:00:00
  currentDate = new Date(month + ' ' + day + ' ' + year);
  var smallDateRegex = /^[\s]*[\d]{1,2}[\s]+[a-zA-Z]{1,15}[\s]*$/;

  // Trello date badge classes
  // is-due-past, is-due-now, is-due-soon, is-due-future

  
});