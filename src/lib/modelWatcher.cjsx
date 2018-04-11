

React = require('./reactLegacy')
_ = require('underscore')

###
  This was stolen from react-datum
###  
module.exports = class ModelWatcher extends React.Component
  @displayName: "ModelWatcher"

  
  contextKey: 'model'


  @propTypes:
    model: React.PropTypes.object
    # something to render if our input model|collection is not available
    placeholder: React.PropTypes.node  # anything react can render
    # additional css classes to add
    className: React.PropTypes.string
    # set debouncedUpdate = false to not debounce, i.e. 1:1 collection or
    # model triggered events to renders. 
    debouncedUpdate: React.PropTypes.bool
    # set debounceMs to a higher delay. 
    debounceMs: React.PropTypes.number
    # set to true to show console messages about useful things
    debug: React.PropTypes.bool
    # style override object for the rendered div.
    style: React.PropTypes.object

  
  # extend these the same was as above or just replace them
  @defaultProps:
    # We don't define placeholder, that's up to our subclass. with 
    # `placeholder: undefined` by default, there is no placeholder,
    # the renderContent method will always render children.  
    # To render no placeholder but not render children, set this to null
    placeholder: undefined
    # We do not define any default style data.
    style: {}
    # effectively batch and defer multiple syncronous events into one defaults to  
    # 0s debounce which will effectively ignore all but the last triggered event
    # in a long sequence
    debouncedUpdate: true
    debounceMs: 0
    
    
  constructor: (props) ->
    super props
    
    @state = 
      lastUpdated: null
      model: null

    # we don't want to delay, but we do want to head off a stampeed when
    # many events fire subsquently like after a large collection.add.
    #  
    # debounceMs is an undocumented prop because I'm not sure it's a good idea
    @debouncedUpdate = if @props.debouncedUpdate 
      _.debounce @update, @props.debounceMs
    else
      @update


  getChildContext: ->
    c = {}
    # it should be in state, if not we have a misunderstanding.  If you do it from the 
    # props and context too, might make it difficult to nullify
    c[@contextKey] = @state.model # || @props[@contextKey] || @context[@contextKey]
    return c


  render: ->
    className = "contextual-data #{@contextKey}"
    className += " #{@props.className}" if @props.className?
    return <span style={_.extend({}, @props.style)} className={className}>{@renderContent()}</span>


  # if the model we provide isn't set, render placeholder if user asked nicely
  renderContent: ->
    if @state.model? || @props.placeholder == undefined
      return @props.children
    
    return @props.placeholder


  ### !pragma coverage-skip-next ###
  componentWillUnmount: ->
    @unbindEvents()
    
    
  componentWillMount: ->
    @initializeModel()
    
  
  ### !pragma coverage-skip-next ###
  componentWillReceiveProps: (newProps)->
    @props = newProps
    @initializeModel()
    
    
  # api
  

  ###
    extend this method to provide additional initialization on the 
    thing you provide.  You should probably call super
  ###
  initializeModel: () ->
    # we already have a model and the props model hasn't changed
    return unless @needsReinitializing()

    @unbindEvents()
    @setmodel()
    @bindEvents()
  
      
  ###
    override this method to input from somewhere other than the context or props being passed in
  ###
  getInputmodel: () ->
    @props[@contextKey] || @context[@contextKey]
  
  
  ###
    override or extend this method to provide something other than what we recieve
  ###  
  getModelToProvide: () ->
    # TODO : I think this should be `@state.model || @getInputmodel()`
    #    that way an extension can just set the provided thing into state instead
    #    of being forced to override this method
    @getInputmodel()
    

  ###
    extend this method to provide additional tests to determine if initialization is 
    needed.  You should probably extend this method like so:
    ```
      return super() || this._someOtherTest()
    ```
  ###
  needsReinitializing: () ->
    model = @getModelToProvide()
    truth = !@state.model? ||model != @_lastPropsModel
    @_lastPropsModel = model
    return truth


  setmodel: () ->
    model = @getModelToProvide()

    @setState(model: model)
    # TODO : why do I need to do this.  @setState seems to not immediately take above
    # and later code on this path depends on this being set
    @state.model = model


  bindEvents: () ->
    @state.model?.on?('all', @onDataChanged, @)


  unbindEvents: () ->
    @state.model?.off?('all', @onDataChanged)


  onDataChanged: () =>
    @debouncedUpdate()
    
    
  update: () =>
    if @props.debug
      console.log "ContextualData: update on model", @state.model
    
    @setState(lastUpdated: Date.now(), model: @getModelToProvide())
    if @props.forceUpdate
      @forceUpdate()
        
        
