/**
 * Convert string array to int array and returns it sorted in reverse order.
 * ["0", "-3", "5"] --returns--> [5, 3, 0]
 */
function sortIntArray(arr) {
  var intArr = arr.map(Number);
  return intArr.sort(function(a, b) {
    return b - a; 
  });
}

/**
 * Decide if hex color needs black or white text color to match.
 * Modified, Credit to @(http://stackoverflow.com/a/12043228/2741279)
 */
function getLumColor(hex) {
  var c = hex.substring(1);    // strip #
  // Convert 3 character hex to 6 character hex
  if (c.length === 3) {
    c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  }
  var rgb = parseInt(c, 16),   // convert rrggbb to decimal
      r = (rgb >> 16) & 0xff,  // extract red
      g = (rgb >>  8) & 0xff,  // extract green
      b = (rgb >>  0) & 0xff,  // extract blue
      luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  
  if (luma < 100) {
    return "#DDDDDD";
  } else {
    return "#222222";
  }
}
