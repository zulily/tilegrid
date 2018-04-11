(function() {
  var $, hasScroll;

  $ = require('jquery');


  /*
    Thanks stackoverflow!   This allows the tilegrid to determine the scroll parent of the tiles
    http://codereview.stackexchange.com/questions/13338/hasscroll-function-checking-if-a-scrollbar-is-visible-in-an-element
  
    You can then use this in any jQuery selector, such as:
    ```
      $('div:hasScroll') //all divs that have scrollbars
      $('div').filter(':hasScroll') //same but better
      $(this).closest(':hasScroll(y)') //find the parent with the vert scrollbar
      $list.is(':hasScroll(x)') //are there any horizontal scrollbars in the list?
    ```
   */

  hasScroll = function(el, index, match) {
    var $el, axis, hidden, sX, sY, scroll, visible;
    $el = $(el);
    sX = $el.css('overflow-x');
    sY = $el.css('overflow-y');
    hidden = 'hidden';
    visible = 'visible';
    scroll = 'scroll';
    axis = match[3];
    if (!axis) {
      if (sX === sY && (sY === hidden || sY === visible)) {
        return false;
      }
      if (sX === scroll || sY === scroll) {
        return true;
      }
    } else if (axis === 'x') {
      if (sX === hidden || sX === visible) {
        return false;
      }
      if (sX === scroll) {
        return true;
      }
    } else if (axis === 'y') {
      if (sY === hidden || sY === visible) {
        return false;
      }
      if (sY === scroll) {
        return true;
      }
    }
    return $el.innerHeight() < el.scrollHeight || $el.innerWidth() < el.scrollWidth;
  };

  $.expr[':'].hasScroll = hasScroll;

}).call(this);
