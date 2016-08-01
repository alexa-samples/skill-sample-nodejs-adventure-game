var fs = require('fs')
var path = require('path')
var gulp = require('gulp')
var package = require('../package.json')
var $ = require('gulp-load-plugins')()

gulp.task('upload', ['generate'], function ( cb ) {

  var config = JSON.parse(fs.readFileSync('./src/skill/models/config.json','utf8'))

  var opts = {
    profile: config.awsProfileName
  }

  return gulp.src('./src/skill/**/*.{js,json}', { base: "." })
    .pipe(
      $.rename( function ( path ) {
        path.dirname = path.dirname.replace('src/skill', '' )
      })
    )
    .pipe( $.zip('dist.zip') )
    .pipe( $.awslambda( config.lambdaName, opts ) )
    .pipe( gulp.dest('./src/skill') )

})
