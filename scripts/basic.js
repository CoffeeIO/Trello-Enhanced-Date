/**
 * Convert string array to int array and returns it sorted.
 */
function sortIntArray(arr) {
  var intArr = arr.map(Number);
  return intArr.sort(function(a, b) {return a - b});
}

/**
 * Decide if hex color needs black or white text color to match.
 * Modified, Credit to @(http://stackoverflow.com/a/12043228/2741279)
 */
function getLumColor(c) {
  var c = c.substring(1);      // strip #
  var rgb = parseInt(c, 16);   // convert rrggbb to decimal
  var r = (rgb >> 16) & 0xff;  // extract red
  var g = (rgb >>  8) & 0xff;  // extract green
  var b = (rgb >>  0) & 0xff;  // extract blue

  var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  console.log("lumen --> " + luma);
  if (luma < 100) {
    return "#DDDDDD";
  } else {
    return "#222222";
  }
}