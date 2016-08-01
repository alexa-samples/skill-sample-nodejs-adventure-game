var gulp = require('gulp')
var $ = require('gulp-load-plugins')()

gulp.task('tags', function () {

  return gulp.src('src/tags/**/*.tag')
    .pipe( $.riot({ modular: true }) )
    .on('error', function ( err ) {
      console.log( err )
    })
    .pipe( gulp.dest('src/tags/js') )

})
