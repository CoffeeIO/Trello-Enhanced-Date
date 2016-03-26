$(document).ready(function () {
  function loadOptions() {
    chrome.storage.sync.get({
      dateColor: ''
    }, function (items) {
      var loadArr = items.dateColor;
      console.log(Object.keys(loadArr));
      loadTableFromSettings(loadArr, sortIntArray(Object.keys(loadArr)));
    });
  }
  function saveOptions(arr) {
    chrome.storage.sync.set({
      dateColor: arr
    }, function () {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function () {
        status.textContent = '';
      }, 750);
    });
  }
  var table = $('.table'),
      rowDefaultColor = '#FFFFFF',
      tableRowNumber = '',
      tableRowColor = '';
  
  // Save options
  $('#save').click(function () {
    var arr = {},
        key = '',
        color = '';
    
    table.find('.setting').each(function (index, obj) {
      key = $(this).find('.day').val();
      console.log('cur key --> ' + key);
      if (key == null || key == '') { 
        return 'non-false';
      }
      color = $(this).find('.color').val();
      console.log('cur color --> ' + color);
      if (color == null || color == '' || color.length > 7) {
        return 'non-false';
      }
      arr[key] = color; // Make json string and add text color 
    });
    
    var keys = Object.keys(arr);
    console.log(keys);
    keys.forEach(function (entry) {
      console.log(arr[entry]);
    });
    
    console.log(JSON.stringify(arr));
    saveOptions(arr);
  });
  function loadTableFromSettings(settingsMap, sortedKeys) {
    console.log(settingsMap);
    console.log("Table --> " + sortedKeys);
    sortedKeys.forEach(function (key) {
      console.log('printing --> ' + key);
      addRow(key, settingsMap[key]);
    });
  }
  function addRow(number, color) {
    tableRowNumber = number,
    tableRowColor = color,
    tableRow = 
          '<tr class="setting">' +
            '<td>' + 
              '<input type="number" class="day form-control" value="' + tableRowNumber + '">' +
            '</td>' +
            '<td>' + 
              '<input class="color form-control" value="' + tableRowColor + '">' +
            '</td>' +
            '<td>' + 
              '<button type="button" class="removeCol btn btn-default">x</button>' +
            '</td>' +
          '</tr>';      
    table.find('.rowFixed').before(tableRow);
    loadColorPicker();
  }
  table.find('.addCol').click(function () {
    addRow('', rowDefaultColor);
  });
  
  $(document).on('click', '.removeCol', function() {
    $(this).closest('.setting').remove();
  });
  
  // Reload tinyColorPicker
  function loadColorPicker() {
    table.find('.color').last().colorPicker({
      opacity: false, // disables opacity slider
      renderCallback: function($elm, toggled) {
          $elm.val('#' + this.color.colors.HEX);
      }
    });
  }
  
  loadColorPicker();
  loadOptions();
});