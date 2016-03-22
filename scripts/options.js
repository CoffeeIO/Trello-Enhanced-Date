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
    
    var arr = {};
    var key = $('.set1 input[type=number]').val();
    if (key != null && key != '') {
      var value = $('.set1 .jscolor').val();
      if (value != null && value != '' && value.length <= 6) {
        arr[key] = value;
      }
    }
    
    var key2 = $('.set2 input[type=number]').val();
    if (key2 != null && key2 != '') {
      var value2 = $('.set2 .jscolor').val();
      if (value2 != null && value2 != '' && value2.length <= 6) {
        arr[key2] = value2;
      }
    }
    
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