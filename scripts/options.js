$(document).ready(function () {
  var table = $('.table'),
      status = $('#status'),
      statusIcon = $('#status-icon'),
      highlightFuture = $('#hightlight-future-dates'),
      rowDefaultColor = '#FFFFFF',
      numberRegex = /^[\-]?[\d]*$/,
      colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  
  // Load settings from chrome storage
  function loadOptions() {
    chrome.storage.sync.get({
      dateColor: '',
      highlightFuture: false
    }, function (items) {
      loadHighlightFromSettings(items.highlightFuture);
      if (items.dateColor === null || items.dateColor === '' || Object.keys(items.dateColor).length === 0) {
        return;
      }
      var loadArr = items.dateColor;
      loadTableFromSettings(loadArr, sortIntArray(Object.keys(loadArr)).reverse());
    });
  }
  
  // Save settings array to chrome storage
  function saveOptions(arr, active) {
    chrome.storage.sync.set({
      dateColor: arr,
      highlightFuture: active
    }, function () {
      status.text('options saved').addClass('valid');
      setTimeout(function () {
        status.text('').removeClass('valid');
      }, 1000);
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
  
  // Load highlight checkbox from settings
  function loadHighlightFromSettings(active) {
    $('#hightlight-future-dates').prop("checked", active);
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
    status.text('').removeClass('invalid');
    
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
        status.text('invalid number of days selected');
        return false;
      } else {
        $dayInput.removeClass('invalid');
      }
      
      if (arr[key] !== undefined && arr[key] !== '') {
        $dayInput.addClass('invalid');
        formValid = false;
        status.text('number of days have already been used');
        return false;
      }
      
      color = $colorInput.val();
      if (color === null || color === '' || !color.match(colorRegex)) {
        $colorInput.addClass('invalid');
        formValid = false;
        status.text('invalid color selected, only HEX colors are supported');
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
      saveOptions(arr, highlightFuture.is(':checked'));
    } else {
      status.addClass('invalid');
    }
  });
  
  // Add the default trello colors and day
  $('#add-trello-colors').click(function () {
    addRow('-1', '#E6C60D');
    addRow('0',  '#CF513D');
    addRow('2',  '#EC9488');
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
