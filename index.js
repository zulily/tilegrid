
var jQueryTilegrid = require('./src/tilegrid')
var ReactTilegrid = require('./src/tilegridComponent')

if(!(window == null)){
  window.jQueryTilegrid = jQueryTilegrid;
  window.ReactTilegrid = ReactTilegrid;
}

module.exports = {
  jQueryTilegrid:    jQueryTilegrid,
  ReactTilegrid:     ReactTilegrid
}

