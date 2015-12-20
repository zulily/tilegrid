
module.exports = 
  
  logo: "img/docs/react-datum.logo.png",

  # these get added to the css linked to the static examples and docs and copied to 
  # docs/css
  styleSheets: [{
    path: "/css/docs/tilegridExample.css"
    media: "screen"
  }]

  scripts: [{
    path: "/test/lib/kittenData.js"
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
