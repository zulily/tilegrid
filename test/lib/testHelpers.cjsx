###
  utilities for writing tests and aliases for long ass, no fucking way I'm typing
  that out, React methods
###

React = require 'react'
ReactDOM = require 'react-dom'
ReactTest = require 'react-addons-test-utils'

###
  leave this in here so tests can be debugged using node-inspector using
  ```
  coffee --nodejs --debug-brk scripts/testRunner.coffee test/form/formSaving.cjsx
  ``` 
  Then hit run in node-inspector UI and it will stop here with the tests loaded so you can
  set breakpoints in them in the debugger
###
debugger 


module.exports = class TestHelpers
  # these are aliases of React test util names that are TFL
  @findByClass:        ReactTest.scryRenderedDOMComponentsWithClass
  @findByTag:          ReactTest.scryRenderedDOMComponentsWithTag
  @render:             ReactTest.renderIntoDocument
  @Simulate:           ReactTest.Simulate

  @domNode: (component) ->
    ReactDOM.findDOMNode(component)


  @domNodeByClass: (component, className) ->
    c = @findByClass(component, className)
    return @domNode(c[0])


  @domNodeByTag: (component, tag) ->
    c = @findByTag(component, tag)
    return @domNode(c[0])


  @dumpHtml: (component) ->
    me = "dumpHtml"
    if component?
      node = @domNode(component)
      if node?
        console.log me, node.outerHTML
      else
        console.log me, "node not found for component:", component
    else
      console.log me, 'component passed is null or undefined'


