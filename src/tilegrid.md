
The Tilegrid component renders a tile containing it's children for each model in the collection.  

- supports single select 
- supports multi/drag select
- lazily renders tiles
- lazily derenders tiles outside the view port
- supports variable height and width tiles within the same grid
- supports nested Tilegrid components
 
simple example:
```jsx
// KITTEN_DATA is a static array of data from petfinder api
//    that gets loaded via script tag for the examples
kittenCollection = new Backbone.Collection(KITTEN_DATA)

var TilegridDisplay = React.createClass({
  displayName:"TilegridDisplay",
  render: function(){
    return (
      <Rd.Collection collection={kittenCollection}>
        <Rd.Tilegrid>
          <Rd.LazyPhoto attr="imageUrl"/>
          <h4><Rd.Text attr="name"/></h4>
          <Rd.Email attr="breed"/>
        </Rd.Tilegrid>
      </Rd.Collection>
    );
    
```
