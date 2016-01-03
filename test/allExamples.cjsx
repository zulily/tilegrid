React = require 'react'
ReactDOM = require 'react-dom'
ReactTest = require 'react-addons-test-utils'
Backbone = require 'backbone'
ReactDatum = require 'react-datum'
$ = require 'jquery'
_ = require 'underscore'

Th = require './lib/testHelpers'
ReactTilegrid = require '../src/tilegridComponent'

TestExamples = require('bumble-test/testExamples')
testExamples = new TestExamples()

KITTEN_DATA = require './lib/kittenData'
# the examples expect these to be script tagged in and be available globally
_.extend global, 
  React: React
  ReactDOM: ReactDOM
  Backbone: Backbone
  ReactDatum: ReactDatum
  ReactTilegrid: ReactTilegrid
  '_': _
  '$': $
  'jQuery': $
  KITTEN_DATA: KITTEN_DATA


describe 'All examples', ->
  testExamples.testAllExamples()
  
    