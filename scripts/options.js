$(document).ready(function () {
  var table = $('.table'),
      status = $('#status'),
      statusIcon = $('#status-icon'),
      rowDefaultColor = '#FFFFFF',
      numberRegex = /^[\-]?[\d]*$/,
      colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  
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
      status.text('Options saved');
      statusIcon.addClass('glyphicon-ok-sign');
      setTimeout(function () {
        status.text('');
        statusIcon.removeClass('glyphicon-ok-sign');
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
              '<input type="number" class="day form-control" value="' + number + '" title="Input valid number">' +
            '</td>' +
            '<td>' + 
              '<input class="color form-control" value="' + color + '" title="Input valid HEX color">' +
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
    status.text('');
    statusIcon.removeClass('glyphicon-remove-sign');
    
    var arr = {},
        key = '',
        color = '',
        formValid = true;
    
    table.find('.setting').each(function (index, obj) {
      
      var $dayInput = $(this).find('.day'),
          $colorInput = $(this).find('.color');
      
      key = $dayInput.val();
      if (key === null || key === '' || !key.match(numberRegex)) { 
        $dayInput.addClass('invalid');
        formValid = false;
        return false;
      } else {
        $dayInput.removeClass('invalid');
      }
      
      color = $colorInput.val();
      if (color === null || color === '' || !color.match(colorRegex)) {
        $colorInput.addClass('invalid');
        formValid = false;
        return false;
      } else {
        $colorInput.removeClass('invalid');
      }
      arr[key] = JSON.stringify({
        "color": color,
        "textColor": getLumColor(color)
      });
    });
    
    if (formValid) {
      saveOptions(arr);
    } else {
      status.text('form invalid');
      statusIcon.addClass('glyphicon-remove-sign');
    }
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
