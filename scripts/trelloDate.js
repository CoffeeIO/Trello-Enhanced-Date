$(document).ready(function () {
  var tempDate = new Date(),
      month = tempDate.getMonth() + 1,
      day = tempDate.getDate(),
      year = tempDate.getFullYear(),
      currentDate = new Date(month + ' ' + day + ' ' + year), //Overwrite to get day at 00:00:00
      smallDateRegex = /^[\s]*[\d]{1,2}[\s]+[a-zA-Z]{1,15}[\s]*$/,
      containSmallDateRegex = /^[\s]*([\d]{1,2})[\s]+([a-zA-Z]{1,15})[\s]*/,
      containBigDateRegex = /^[\s]*([\d]{1,2})[\s]+([a-zA-Z]{1,15})[\s]*([\d]{3,4})[\s]*/,
      containTodayRegex = /^[\s]*(s|today)[\s]*/,
      containTomorrowRegex = /^[\s]*(s|tomorrow)[\s]*/,
      containYesterdayRegex = /^[\s]*(s|yesterday)[\s]*/;
  
  // Get settings from chrome storage
  function loadSettings() {
    chrome.storage.sync.get({
      dateColor: '',
      highlightFuture: false
    }, function (items) {
      if (items.dateColor === null || items.dateColor === '') {
        return;
      }
      var loadArr = items.dateColor,
          arrSorted = sortIntArray(Object.keys(loadArr)),
          isHighlightFuture = items.highlightFuture;
      applyTrelloExpand(loadArr, arrSorted, isHighlightFuture);
      applyTrelloBoard(loadArr, arrSorted, isHighlightFuture);
    });
  }
  
  // Finder number of days between to dates
  // Modified, Credit to @(http://stackoverflow.com/a/3224854)
  function getDiffDays(date1, date2) {
    var timeDiff = date1.getTime() - date2.getTime();
    return Math.ceil(timeDiff / (86400000)); // 1000 * 60 * 60 * 24
  }

  // Apply styling to single element
  function applyCardStyling(sortedKeys, settingsMap, diffDays, element, highlightFuture) {
    var styleApplied = false;
    element.css('background-color', '#fff'); // Overwrite all cards w/ default color
    
    sortedKeys.some(function (key) {
      if (key <= diffDays) {
        var settingArr = JSON.parse(settingsMap[key]);
        element.css('background-color', settingArr.color).css('color', settingArr.textColor).css('border-radius', '3px');
        styleApplied = true;
      }
      return key <= diffDays;
    });
    if (!styleApplied && highlightFuture) {
      var settingArr = JSON.parse(settingsMap[sortedKeys[sortedKeys.length - 1]]);
      element.css('background-color', settingArr.color).css('color', settingArr.textColor).css('border-radius', '3px');
    }
  }
  
  // Apply date styling to trello board
  function applyTrelloBoard(settingsMap, sortedKeys, highlightFuture) {
    var trelloBoard = $('#board'); // Re-declare the new board
    trelloBoard.find('[class*="is-due-"]').each(function (index, obj) {
      var ele = $(this),
          date = ele.find('.badge-text').text(),
          styleApplied = false;
      
      if (date.match(smallDateRegex)) {
        date += ' ' + currentDate.getFullYear();
      }
      
      var diffDays = getDiffDays(currentDate, new Date(date));
      
      applyCardStyling(sortedKeys, settingsMap, diffDays, ele, highlightFuture);
    });
  }
  
  // Apply date styling to trello expanded cards
  function applyTrelloExpand(settingsMap, sortedKeys, highlightFuture) {
    var trelloWindow = $('.window'),
        label = trelloWindow.find('.js-card-detail-due-date-badge'),
        diffDays = 0,
        styleApplied = false;
    if (label.length !== 0) {
      var date = label.text(),
          matches = null;
      if (matches = date.match(containBigDateRegex)) {
        date = matches[0];
        diffDays = getDiffDays(currentDate, new Date(date));
      } else if (matches = date.match(containSmallDateRegex)) {
        date = matches[0] + currentDate.getFullYear();
        diffDays = getDiffDays(currentDate, new Date(date));
      } else if (date.match(containYesterdayRegex)) {
        diffDays = 1;
      } else if (date.match(containTodayRegex)) {
        diffDays = 0;
      } else if (date.match(containTomorrowRegex)) {
        diffDays = -1;
      } else {
        return;
      }
      
      applyCardStyling(sortedKeys, settingsMap, diffDays, label, highlightFuture);
    } 
  }
  
  // Re-apply trello enhance when dom changes, limit to once per second.
  var maxRefreshRate = 250,
      canRefresh = true,
      domDirty = false,
      ignoreDomChange = false;
  
  function reapplyEnhancer() {
    ignoreDomChange = true; // Ignore dom change since loadSettings() cause change in dom
    canRefresh = false;     // Allow the enhancer to be applied on dom change
    domDirty = false;       // Marks the dom as dirty if changes happened within the maxRefreshRate
    loadSettings();         // Reload enhancer
  }
  
  setInterval(function () {
    if (domDirty) {
      reapplyEnhancer();
    } else {
      canRefresh = true;
    }
  }, maxRefreshRate);
  
  // Modified, Credit to @(http://stackoverflow.com/a/11546242/2741279)
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  var observer = new MutationObserver(function(mutations, observer) {
    if (ignoreDomChange) {
      ignoreDomChange = false;
      return false;
    }
    if (canRefresh) {
      reapplyEnhancer();
    } else {
      domDirty = true;
    }
  });
  observer.observe(document.getElementById("content"), {
    subtree: true,
    attributes: true
  });
  
  loadSettings();  
});

