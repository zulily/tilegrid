# tilegrid

An almost infinitely scrolling tile display component for variable height and variable width tiles.  With built in support for [React](https://facebook.github.io/react/) >= v0.14 and [Backbone.js](http://backbonejs.org/) >= v0.9.2 

Also compatible with [react-datum](http://zulily.github.io/react-datum/docs/)



## What does it do?

The Tilegrid component renders a tile containing it's children for each model in a [Backbone.js] collection.  

 - supports single select 
 - supports multi/drag select
 - lazily renders tiles
 - lazily derenders tiles outside the view port
 - supports variable height and width tiles within the same grid
 - supports nested Tilegrid components

 
simple example using React:

```jsx
// KITTEN_DATA is a static array of data from petfinder api
//    that gets loaded via script tag for the examples
var kittenCollection = new Backbone.Collection(KITTEN_DATA)

var MyTilegridDisplay = React.createClass({
  render: function(){
    return (
      <ReactTilegrid collection={kittenCollection}>
        <MyKittenCard/>
      <ReactTilegrid>
    )
  }
})  
```
The example above will render one of your `MyKittenCard` component per Backbone model in the Backbone collection.  The Tilegrid component will make the Backbone model for that tile available as context variable to all ancestors and as a direct react property to MyKittenCard.

simple example without React:
```javascript

var kittenCollection = new Backbone.Collection(KITTEN_DATA)
var tileTemplate = "<div/>"

var tilegrid = new Tilegrid("#kittenTilegrid", kittenCollection, tileTemplate, {
  onTileRendered: function($tile, model){
    // at this point you can do anything with the tile 
    $tile.text("This kitty's name is " + model.get('name'))
  }
})

```
Tilegrid will take care of rendering and derendering your tiles as they come in and out of user view.

Tilegrid uses a bump-extend strategy for rendering tiles.  Tiles are added to the end of the rendering area as the user scrolls down the page.  As a result, you can not immediately scroll to the bottom of a large result set.  The trade off is that you can easily render tiles that are variable height, variable width or both.     

Tilegrid derenders tiles.  When the user scrolls up or down in the view, tiles will be derendered that are a configurable distance from the viewport.  To derender tiles, height and width fixed and all content in the tile element, html and text, is removed.  When the tile is later scrolled back into view, the tile is rendered back into existance and onTileRendered is called again for that tile. 

By default, tiles are rendered as `display: inline-block` and will render to the size of the content in them.  You control styling and preferred styling of tiles via CSS.  So, if you wanted tiles like ones on the left of the examples viewer (TODO: link to demo viewer), you could add a css rule that sets the width of the `.tile` element.   You can also change the display style of the tile to `display: block` if you wanted to force one tile per row regardless of viewport width.

  


