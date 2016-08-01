var fs = require('fs')
var gulp = require('gulp')
var $ = require('gulp-load-plugins')()

gulp.task('generate', function ( cb ) {

  var config = JSON.parse(fs.readFileSync('./src/skill/models/config.json','utf8'))
  var scenes = JSON.parse(fs.readFileSync('./src/skill/models/scenes.json','utf8'))
  var intentSchema = {}

  return new Promise( function ( resolve, reject ) {

    var intentNames = new Set()
    var functionDefs = {}
    var utterances = []

    intentSchema.intents = [{ intent: 'UnrecognizedIntent' }]
    utterances.push.apply( utterances, [
      'UnrecognizedIntent ThisIsPurposlyNonSense',
      'UnrecognizedIntent ThisIsPurposlyNonSense ThisIsPurposlyNonSense',
      'UnrecognizedIntent ThisIsPurposlyNonSense ThisIsPurposlyNonSense ThisIsPurposlyNonSense',
      'UnrecognizedIntent ThisIsPurposlyNonSense ThisIsPurposlyNonSense ThisIsPurposlyNonSense ThisIsPurposlyNonSense',
      'UnrecognizedIntent ThisIsPurposlyNonSense ThisIsPurposlyNonSense ThisIsPurposlyNonSense ThisIsPurposlyNonSense ThisIsPurposlyNonSense'
    ])

    // process commands from config.json
    Object.keys( config.commands ).forEach( function( intent ) {
      functionDefs[ intent ] = createFunctionDefinition( intent, config.commands[ intent ][0] )
      config.commands[ intent ].forEach( function ( utterance ) {
        utterance = replaceIntegersWithWords( utterance )
        utterances.push( intent + ' ' + utterance )
        intentNames.add( intent )
      })
    })

    // process scenes from script/.json
    scenes.forEach( function( scene ) {
      if ( ! scene.options ) return // exit
      scene.options.forEach( function( option ) {
        var intent = createIntentName(replaceIntegersWithWords( option.utterances[0] ))
        functionDefs[ intent ] = createFunctionDefinition( intent, option.utterances[0] )
        intentNames.add( intent )
        option.utterances.forEach( utterance => {
          utterance = replaceIntegersWithWords( utterance )
          utterances.push( intent + ' ' + utterance )
        })
      })
    })

    // construct intent schema
    for ( var name in functionDefs ) {
      var intentExists = intentSchema.intents.find( function ( intent ) {
        return ( intent.intent === name )
      })
      if ( ! intentExists ) {
        intentSchema.intents.push({ intent: name, })
      }
    }

    // write generated intents
    functionDefsWriteStream = fs.createWriteStream('./src/skill/handlers/intentHandlers_generated.js')
    functionDefsWriteStream.on('open', function () {
      functionDefsWriteStream.write('var processUtterance = require(\'./processUtterance\')\n\n')
      functionDefsWriteStream.write('module.exports = {\n')
      for ( var name in functionDefs ) {
        functionDefsWriteStream.write( '\t"' + name + '": ' + functionDefs[ name ] )
      }
      functionDefsWriteStream.write('}')
      functionDefsWriteStream.end()
    })

    // write utterance
    utterancesWriteStream = fs.createWriteStream('./src/skill/models/utterances.txt')
    utterancesWriteStream.on('open', function () {
      utterancesWriteStream.write( utterances.join('\n') )
      utterancesWriteStream.end()
    })

    // write intent schema
    intentSchemaWriteStream = fs.createWriteStream('./src/skill/models/intentSchema.json')
    intentSchemaWriteStream.on('open', function () {
      var content = JSON.stringify( intentSchema, null, 2 )
      intentSchemaWriteStream.write( content )
      intentSchemaWriteStream.end()
    })

    resolve()

  })

})

function createIntentName ( utterance ) {
  return utterance.toLowerCase().split(' ').map( function ( word ) {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }).join('') + 'Intent'
}

function createFunctionDefinition ( intentName, utterance ) {
  return 'function ( intent, session, request, response ) {\n'
  + '\t\tprocessUtterance( intent, session, request, response, "' + utterance + '" )\n'
  + '\t},\n'
}

function replaceIntegersWithWords ( utterance ) {
  return utterance.split(' ').map( function ( word ) {
    if ( Number( word ) ) return word = convertIntegerToWord( Number( word ) )
    return word
  }).join(' ')
}

function convertIntegerToWord ( it ) {

  var units = new Array ("zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen")
  var tens = new Array ("twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety")
	var theword = ""
	var started

  if ( it > 999 ) return "Lots"
	if ( it == 0 ) return units[0]

  for (var i = 9; i >= 1; i--){
		if (it>=i*100) {
			theword += units[i]
			started = 1
			theword += " hundred"
			if (it!=i*100) theword += " and "
			it -= i*100
			i=0
		}
	}

	for (var i = 9; i >= 2; i--){
		if (it>=i*10) {
			theword += (started?tens[i-2].toLowerCase():tens[i-2])
			started = 1
			if (it!=i*10) theword += "-"
			it -= i*10
			i=0
		}
	}

	for (var i=1; i < 20; i++) {
		if (it==i) {
			theword += (started?units[i].toLowerCase():units[i])
		}
	}

	return theword

}
