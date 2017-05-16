#!/usr/bin/env coffee

fs = require 'fs'
path = require 'path'
_ = require 'underscore'

util = require 'bumble-util'

###
  This script is run from grunt as part of the build process.

  - checks to see if you are also developing on zuKeeper by presence of ../htdocs_ems. If found...
  - copies dist/react-datum.js and dist/react-datum.min.js distro files to
   ../htdocs_ems/app/webroot/js/lib
  - attempts to scp the two distro files to your VPS at /var/www/htdocs/zulily-event-management

  You can use enviroment variables
    ZUKEEPER_SRC - to specify a different location of zuKeeper source root (full path)
    ZUKEEPER_VPS - to specify a diff VPS than  $USER-emsweb-01.vps.zulily.com

###

# if you used `cake react-datum` from zuKeeper root, it recorded it's resolved directory
# to a file which should be most reliable
try
  savedZukeeperRoot = fs.readFileSync('.zukeeperRoot').toString()
catch
  # it didn't find it

srcs = 'dist/tilegrid.*'    # should capture ...js ...min.js, .css
zkRelativeDir = 'app/webroot/js/lib'
zkRemoteRoot = '/var/www/htdocs/zulily-event-management'

zkSrcDir = process.env.ZUKEEPER_SRC || savedZukeeperRoot || "../htdocs_ems"
unless fs.existsSync(zkSrcDir)
  console.log "zukeeper src dir not found skipping deploy to zk"
  process.exit(0)


vps = process.env.ZUKEEPER_VPS || "#{process.env.USER}-emsweb-01.vps.zulily.com"
zkLocalDir = path.join(zkSrcDir, zkRelativeDir)
zkRemoteDir = "#{vps}:#{path.join(zkRemoteRoot, zkRelativeDir)}"

util.systemCmd "cp -f #{srcs} #{zkLocalDir}"
util.systemCmd "scp #{srcs} #{vps}:/var/www/htdocs/zulily-event-management/app/webroot/js/lib"
