var jQueryTilegrid = require('./src/tilegrid')
var ReactTilegrid = require('./src/tilegridComponent')
var MultiSelect = require('./src/multiSelect')

if(!(window == null)){
  window.jQueryTilegrid = jQueryTilegrid;
  window.ReactTilegrid = ReactTilegrid;
  window.MultiSelect = MultiSelect;
}

module.exports = {
  jQueryTilegrid:    jQueryTilegrid,
  ReactTilegrid:     ReactTilegrid,
  MultiSelect:     MultiSelect
}