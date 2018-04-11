
React = require 'react'


# React.PropTypes was moved from React package to it's npm package at v15.5.  
# 
# Besides our api documentation generator looking for React.PropTypes - will make look for both patterns, 
# putting them back on the React object was a lot easier that going through all of the places in the code 
React.PropTypes = require 'prop-types' unless React.PropTypes?

module.exports = React