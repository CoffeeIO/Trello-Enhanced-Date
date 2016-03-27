$(document).ready(function () {
  var table = $('.table'),
      rowDefaultColor = '#FFFFFF';
  
  // Load settings from chrome storage
  function loadOptions() {
    chrome.storage.sync.get({
      dateColor: ''
    }, function (items) {
      var loadArr = items.dateColor;
      loadTableFromSettings(loadArr, sortIntArray(Object.keys(loadArr)));
    });
  }
  
  // Save settings array to chrome storage
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
  
  // Add table row for each setting
  function loadTableFromSettings(settingsMap, sortedKeys) {
    sortedKeys.forEach(function (key) {
      var arr = JSON.parse(settingsMap[key]);
      addRow(key, arr.color);
    });
  }
  
  // Add row to table
  function addRow(number, color) {
    var tableRow = 
          '<tr class="setting">' +
            '<td>' + 
              '<input type="number" class="day form-control" value="' + number + '">' +
            '</td>' +
            '<td>' + 
              '<input class="color form-control" value="' + color + '">' +
            '</td>' +
            '<td>' + 
              '<button type="button" class="removeRow btn btn-default">x</button>' +
            '</td>' +
          '</tr>';
  
    table.find('.rowFixed').before(tableRow);
    loadColorPicker();
  }
  
  // Save options button
  $('#save').click(function () {
    var arr = {},
        key = '',
        color = '';
    
    table.find('.setting').each(function (index, obj) {
      key = $(this).find('.day').val();
      if (key === null || key === '') { 
        return 'non-false';
      }
      color = $(this).find('.color').val();
      if (color === null || color === '' || color.length > 7) {
        return 'non-false';
      }
      arr[key] = JSON.stringify({
        "color": color,
        "textColor": getLumColor(color)
      });
    });
        
    saveOptions(arr);
  });
  
  // Add row button
  table.find('.addRow').click(function () {
    addRow('', rowDefaultColor);
  });
  
  // Remove row button
  $(document).on('click', '.removeRow', function() {
    $(this).closest('.setting').remove();
  });
  
  loadOptions();
});
