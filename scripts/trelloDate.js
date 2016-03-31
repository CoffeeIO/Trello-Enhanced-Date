$(document).ready(function () {
  var trelloBoard = $('#board'),
      tempDate = new Date(),
      month = tempDate.getMonth() + 1,
      day = tempDate.getDate(),
      year = tempDate.getFullYear(),
      currentDate = new Date(month + ' ' + day + ' ' + year), //Overwrite to get day at 00:00:00
      smallDateRegex = /^[\s]*[\d]{1,2}[\s]+[a-zA-Z]{1,15}[\s]*$/; 
  
  function loadSettings() {
    chrome.storage.sync.get({
      dateColor: ''
    }, function (items) {
      if (items.dateColor === null || items.dateColor === '') {
        return;
      }
      var loadArr = items.dateColor,
          arrSorted = sortIntArray(Object.keys(loadArr));      
      applyDateEnchance(loadArr, arrSorted);
    });
  } 
  
  // Apply date styling to trello
  function applyDateEnchance(settingsMap, sortedKeys) {
    trelloBoard = $('#board'); // Re-declare the new board
    trelloBoard.find('[class*="is-due-"]').each(function (index, obj) {
      var ele = $(this),
          date = ele.find('.badge-text').text();
      ele.css('background-color', '#fff'); // Overwrite all cards w/ default color
      
      if (date.match(smallDateRegex)) {
        date += ' ' + currentDate.getFullYear();
      }
      // Modified, Credit to @(http://stackoverflow.com/a/3224854)
      var timeDiff = currentDate.getTime() - new Date(date).getTime(),
          diffDays = Math.ceil(timeDiff / (86400000)); // 1000 * 60 * 60 * 24
      
      sortedKeys.forEach(function (key) {
        if (key <= diffDays) {
          var settingArr = JSON.parse(settingsMap[key]);
          ele.css('background-color', settingArr.color).css('color', settingArr.textColor).css('border-radius', '3px');
        }
      });
    });
  }
  
  // Re-apply trello enhance when dom changes, limit to once per second.
  var maxRefreshRate = 1000,
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
  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
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

