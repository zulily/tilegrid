###

  Originally installed by node_modules/.bin/bumble-build.
  
  You can reset to base config at anytime by running 
  node_modules/.bin/bumble-build. 
  
  BE SURE TO CHECK in your changes before resetting

  webpack setup and external grunt tasks borrowed from:
    https://github.com/felixhao28/using-coffee-react-for-frontend-dev-walkthrough

###

Path = require('path')
Util = require('bumble-util')
GitStatusUtils = require('git-status-utils')


CSS_FILES_TO_DISTRIB = [
  'css/**/*.css'
]


BUMBLE_DOCS_SCRIPTS = './node_modules/bumble-docs/bin/'
bumbleScriptCommand = (scriptFile, args="")-> 
  return "coffee #{Path.join(BUMBLE_DOCS_SCRIPTS, scriptFile)} #{args}"


module.exports = (grunt) ->
    
  # load plugins
  # this loads all of the grunt-... packages in package.json.  clever
  require('load-grunt-tasks')(grunt)
  pkg = grunt.file.readJSON("package.json")

  # initialize grunt
  grunt.initConfig
  
    pkg: pkg

    # args to initConfig method are the tasks
    clean:
      distrib: ["dist/#{pkg.name}.*"]
      lib: ["lib/*"]
      docsVendorLibs: ["docs/vendor/*"]

    copy:
      docVendorLibs: 
        files: [
          { src: "dist/tilegrid.js",    dest: "docs/vendor/tilegrid.js"}
        ]
      
    cjsx:
      build:
        files: [
          expand: true
          cwd: 'src'
          src: ['**/*.cjsx', '**/*.coffee']
          dest: 'lib'
          ext: '.js'
        ]
      
    cssmin:
      options:
        shorthandCompacting: false,
        keepBreaks: true
      distrib:
        files:[
          {src: CSS_FILES_TO_DISTRIB, dest: "dist/#{pkg.name}.css"}
        ]    
    
    shell:
      buildExamples:
        command: bumbleScriptCommand('buildExamples.coffee')

      buildDocIndex:
        command: bumbleScriptCommand('buildDocIndex.coffee')
        
      buildApiDocs: 
        command: bumbleScriptCommand('buildApiDocs.coffee')
      
      deploy:
        options:
          # should gracefully fail if it doesn't find zukeeper src.  see comment at top of the script
          failOnError: false
        command: 'coffee ./scripts/deploy.coffee'
      
      npmInstall:
        command: 'npm install'
      
      test:
        command: 'node_modules/bumble-test/bin/testRunner.coffee'
        execOptions:
          env: {NODE_ENV: 'test'}
        
      coverage:
        command: 'node_modules/.bin/istanbul report text-summary lcov'
    
    coveralls:
      options:
        force: true
      
      upload:
        src: 'coverage/lcov.info'
        

    availabletasks:
      tasks:
        options:
          filter: 'include'
          tasks: ['build', 'test', 'watch',  'clean', 'docs']
          descriptions: 
            build: "Builds everything except docs & examples"
            test: "Builds everything and then run tests in /test"
            watch: "Watch for changing files and calls build."
            docs: "Build the docs. To publish to github.io, you must pull master into gh-pages and run 'grunt build docs' in the gh-pages branch"
            clean: "Remove all compiled files. Use `grunt clean build` to rebuild everything from scratch"


    watch:
      build:
        files: ["src/**/*", "css/**/*", "lib/**/*", "scripts/**/*", "webpack.config.coffee"]
        tasks: ["build"]


    webpack:
      distrib: require("./webpack.config.coffee")
      optimize: require("./webpack.config.min.coffee")


  # tasks
  grunt.registerTask 'test', ["shell:test", "shell:coverage"]
  grunt.registerTask 'distrib', ['cssmin:distrib', 'webpack:distrib', 'webpack:optimize','shell:deploy']
  grunt.registerTask 'docs',  ['clean:docsVendorLibs', 'copy:docVendorLibs', 'shell:buildDocIndex', 'shell:buildApiDocs', 'shell:buildExamples']
  grunt.registerTask 'build', ['npmInstall', 'newer:cjsx:build', 'distrib', 'docs']
  grunt.registerTask 'default', ['availabletasks']
  
  LAST_NPM_INSTALL_FILE = './.lastNpmInstall'
  grunt.registerTask 'npmInstall', 'runs npm install if node_modules not up to date with package.json', ->
    Util.npmInstall()

  
  grunt.registerTask 'gh-pages', 'publishes complied docs to github.io', ->
    @gitStatus = GitStatusUtils.getStatus '.'
    if @gitStatus.stagedChanges.length > 0 || @gitStatus.unstagedChanges.length > 0
      console.log "Cowardly refusing to publish to gh-pages.  Uncommitted changes exist on current branch"
      return false
    if @gitStatus.branch != 'master' && !grunt.option('force')
      console.log "Cowardly refusing to publish to gh-pages from branch (#{@gitStatus.branch}) other than master.  Use --force to continue"
      return false
    Util.systemCmd 'git co gh-pages'
    Util.systemCmd 'git pull . master'
    Util.systemCmd 'grunt build'
    # /docs dir is normally ignored by git via .gitignore, but in the gh-pages
    #  branch /docs needs to be checked in
    Util.systemCmd 'git add docs'
    Util.systemCmd 'git push origin gh-pages'
    Util.systemCmd 'git co master'
  
  
