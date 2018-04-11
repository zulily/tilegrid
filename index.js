var jQueryTilegrid = require('./lib/tilegrid')
var ReactTilegrid = require('./lib/tilegridComponent')
var MultiSelect = require('./lib/multiSelect')

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

