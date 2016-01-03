
module.exports = 
  
  logo: "img/docs/tilegrid.logo.png",

  # these get added to the css linked to the static examples and docs and copied to 
  # docs/css
  styleSheets: [{
    path: "css/docs/tilegridExample.css"
    media: "screen"
  }]

  scripts: [{
    path: "test/lib/kittenData.js"
  },{
    # hmmm... this is... awkward. :) BumbleDocs uses us for it's demo viewer and has a special 
    # case hack to not include it's vendor version of us which is minified and latest stable.
    # This insures we are testing and debugging the latest version compiled local to this project.
    path: "dist/tilegrid.js"
  }]
  
  apiDocs: {
    sections: [{
      label: "Tilegrid" 
      path: "src/datums/**/*"
    }]
  }

  examples: 
    root: 'examples'
    demos: [{
      id: "bigKittens",
      name: "Big Kittens Demo!",
      path: "tilegrid.jsx",
      description: "This demo shows off the variable height and width capabilities of the tiles.  ...with kittens!"
    }]    
