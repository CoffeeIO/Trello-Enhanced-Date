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
      arr[key] = JSON.stringify({
        "color": color,
        "textColor": getLumColor(color)
      });
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
      var arr = JSON.parse(settingsMap[key]);
      addRow(key, arr.color);
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
  
  // Reload colorPicker by PitPik
  function loadColorPicker() {
    table.find('.color').last().colorPicker({
      noAlpha: true, // disables opacity slider
      cmyOnly: false,
      noRGBr: false,
      noRGBg: false,
      noRGBb: false,
      init: function(elm, colors) {
        elm.style.backgroundColor = elm.value;
        elm.style.color = colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd';
      }
    });
  }
  
  loadOptions();
});