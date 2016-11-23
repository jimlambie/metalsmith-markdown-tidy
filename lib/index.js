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

  return function (files, metalsmith, done) {
    setImmediate(done)

    Object.keys(files).forEach(function (file) {
      var isMarkdown = extname(file) === '.md'

      if (isMarkdown && files[file] && files[file].contents && files[file].contents instanceof Buffer) {
        var content = files[file].contents.toString()
        var cleanMarkdown = tidyMarkdown(content, opts)
        files[file].contents = new Buffer(cleanMarkdown)
      }
    })
  }
}
