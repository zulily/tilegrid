
$ = require 'jquery'

###
  Thanks stackoverflow!   This allows the tilegrid to determine the scroll parent of the tiles
  http://codereview.stackexchange.com/questions/13338/hasscroll-function-checking-if-a-scrollbar-is-visible-in-an-element

  You can then use this in any jQuery selector, such as:
  ```
    $('div:hasScroll') //all divs that have scrollbars
    $('div').filter(':hasScroll') //same but better
    $(this).closest(':hasScroll(y)') //find the parent with the vert scrollbar
    $list.is(':hasScroll(x)') //are there any horizontal scrollbars in the list?
  ```
###
hasScroll = (el, index, match) ->
  $el = $(el)
  sX = $el.css('overflow-x')
  sY = $el.css('overflow-y')
  hidden = 'hidden'
  visible = 'visible'
  scroll = 'scroll'
  axis = match[3]
  # regex for filter -> 3 == args to selector
  if !axis
    # better check than undefined
    #Check both x and y declarations
    if sX == sY and (sY == hidden or sY == visible)
      #same check but shorter syntax
      return false
    if sX == scroll or sY == scroll
      return true
  else if axis == 'x'
    # don't mix ifs and switches on the same variable
    if sX == hidden or sX == visible
      return false
    if sX == scroll
      return true
  else if axis == 'y'
    if sY == hidden or sY == visible
      return false
    if sY == scroll
      return true
  #Compare client and scroll dimensions to see if a scrollbar is needed
  $el.innerHeight() < el.scrollHeight or $el.innerWidth() < el.scrollWidth
  #innerHeight is the one you want

$.expr[':'].hasScroll = hasScroll
