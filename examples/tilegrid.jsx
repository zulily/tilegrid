

var Rd = ReactDatum
var Tilegrid = ReactTilegrid

var KittenModel = Backbone.Model.extend({
  save: function(attrs, options){ 
    options.success(this)
    return true
  }
})
// KITTEN_DATA is a static array of data from petfinder api
//    that gets loaded via script tag for the examples
var KittenCollection = Backbone.Collection.extend({
  model: KittenModel
})

var kittenCollection = new KittenCollection(KITTEN_DATA)

// The above is all backbone setup that you would probably do 
// elsewhere or wouldn't need to do, like stub out model save

// Below is really most of what you need for a basic list
// left, form right type view.  All in 30 lines of code!

var TilegridDisplay = React.createClass({
  displayName:"TilegridDisplay",
  render: function(){
    return (
      <Rd.Collection collection={kittenCollection}>
        <div className="grid">
          <Rd.CollectionStats itemDisplayName="Kittens"/>
          <Tilegrid>
            <Rd.LazyPhoto attr="imageUrl"/>
            <h4><Rd.Text attr="name"/></h4>
            <Rd.Email attr="breed"/>
          </Tilegrid>
        </div>
        <div className="preview">
          <Rd.SelectedModel placeholder="Select a kitten to see information here">
            <Rd.LazyPhoto attr="imageUrl"/>
            <div className='top-right'>
              <h3>Adopt <Rd.Text attr="name" readonly/> Today!</h3>
              <div><Rd.Link attr="petfinderUrl">Show <Rd.Text attr="name" readonly/> on Petfinder.com</Rd.Link></div>
              <div><Rd.Email attr="contactEmail" label="Email now:" displayAsLink readonly/></div>
            </div>
            <Rd.ClickToEditForm className='kitten-form'>
              <div><Rd.Text attr="name" label="Name: " setOnChange required/></div>
              <div><Rd.Email attr="contactEmail" label="Sponsor Email: "/></div>
              <div><Rd.Text attr="description" className="wide-input" ellipsizeAt={false} displayAsHtml/></div>
            </Rd.ClickToEditForm>
          </Rd.SelectedModel>
        </div>
      </Rd.Collection>
    )
  }
})

window.Demo = TilegridDisplay
