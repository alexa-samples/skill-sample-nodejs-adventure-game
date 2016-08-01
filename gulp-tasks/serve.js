var fs = require('fs')
var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var browserSync = require('browser-sync')
var runSequence = require('run-sequence')

gulp.task('serve', function () {

  gulp.watch([
    'src/*.html',
    'src/scripts/**/*.js',
    'src/tags/js/**/*.js',
    // 'src/skill/models/config.json',
    // 'src/skill/models/scenes.json'
  ]).on('change', browserSync.reload )
  gulp.watch('src/tags/**/*.tag',['tags'])
  gulp.watch('src/styles/**/*.scss',['styles'])

  return browserSync({
    ghostMode: false,
    notify: false,
    port: 9000,
    server: {
      baseDir: ['src'],
      routes: {
        "/jspm_packages": "jspm_packages"
      }
    },
    middleware: [ saveConfig ]
  })

})

function saveConfig ( req, res, next ) {

  if ( req.method === 'POST' && req.url === '/persist' ) {

    var body = ''
    req.on('data', function (data) {
      body += data
    })

    req.on('end', function () {
      try {
        var configPath = './src/skill/models/config.json'
        var scenesPath = './src/skill/models/scenes.json'
        var json = JSON.parse( body )
        fs.writeFileSync( configPath, JSON.stringify( json.config, null, 2 ) )
        console.log("Config saved to " + configPath )
        fs.writeFileSync(scenesPath, JSON.stringify( json.scenes, null, 2 ) )
        console.log("Scenes saved to " + scenesPath )
        runSequence( json.upload ? 'upload' : 'generate' )

        res.writeHead(200)
      }
      catch ( err ) {
        res.writeHead(500)
        console.log( err )
      }
      res.end()
      next()
    })

  }
  else {
    next()
  }

}
