var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var browserSync = require('browser-sync')

var browserlist = ['last 1 version','Android > 4']

gulp.task('styles', function () {

  return gulp.src(['src/styles/main.scss'])
    .pipe( $.sourcemaps.init() )
    .pipe( $.sass({
      outputStyle: 'compressed',
      errLogToConsole: true
    }).on('error', $.sass.logError))
    .pipe( $.postcss([
      require('autoprefixer-core')({ browsers: browserlist })
    ]))
    .on('error', function ( err ) {
      console.log( err )
    })
    .pipe( $.minifyCss() )
    .pipe( $.sourcemaps.write() )
    .on('error', function ( err ) {
      console.log( err )
    })
    .pipe( gulp.dest('src/styles') )
    .pipe(browserSync.stream())

})
