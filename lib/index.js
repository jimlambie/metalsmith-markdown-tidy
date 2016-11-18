var extname = require('path').extname
var dirname = require('path').dirname
var basename = require('path').basename
var tidyMarkdown = require('tidy-markdown')

/**
 * Expose `plugin`.
 */
module.exports = plugin

function plugin (opts) {
  opts = opts || {}
  // opts.pattern = opts.pattern || []
  // opts.ignorekeys = Array.isArray(opts.ignorekeys) ? opts.ignorekeys : []
  // opts.childIgnorekeys = Array.isArray(opts.childIgnorekeys) ? opts.childIgnorekeys : []
  // opts.collections = opts.collections || {}
  // opts.space = opts.space || ''
  // opts.bufferencoding = opts.bufferencoding || false
  return function (files, metalsmith, done) {
    //var metadata = metalsmith.metadata()
    setImmediate(done)
    Object.keys(files).forEach(function (file) {
      var isMarkdown = extname(file) === '.md'

      if (isMarkdown && files[file] && files[file].contents && files[file].contents instanceof Buffer) {
        var content = files[file].contents.toString()
        var cleanMarkdown = tidyMarkdown(content)
        files[file].contents = new Buffer(cleanMarkdown)

        // console.log(file)
        // console.log(files[file].contents)
      }
    })
  }
}
