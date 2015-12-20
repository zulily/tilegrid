
class KittenModel extends Backbone.Model
  save: (attrs, options={}) ->
    options.success(this);
    return true

# KITTEN_DATA is a static array of data from petfinder api
#    that gets loaded via script tag for the examples
class KittenCollection extends Backbone.Collection
  model: KittenModel
  constructor: ->
    super(KITTEN_DATA)


module.exports = new KittenCollection()
  
  