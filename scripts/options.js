$(document).ready(function () {
  function loadOptions() {
    chrome.storage.sync.get({
      dateColor: ''
    }, function (items) {
      var loadArr = items.dateColor;
      console.log(Object.keys(loadArr));
      
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
  
  $('#save').click(function () {
    
    var table = $('.table'),
        arr = {},
        key = '',
        color = '';
    
    table.find('.setting').each(function (index, obj) {
      key = $(this).find('.day').val();
      if (key == null || key == '') { 
        return 'non-false';
      }
      color = $(this).find('.color').val();
      if (color == null || color == '' || color.length > 6) {
        return 'non-false';
      }
      arr[key] = color;
    });
    
    var keys = Object.keys(arr);
    console.log(keys);
    keys.forEach(function (entry) {
      console.log(arr[entry]);
    });
    
    console.log(JSON.stringify(arr));
    saveOptions(arr);
  });
  loadOptions();
});