'use strict'

var AlexaSkill = require('../AlexaSkill')
var dynamo = require('./dynamoDB')
var utils = require('./utils')

module.exports = {

  readSceneWithCard: function ( scene, session, response ) {
    var json = buildResponse( scene, session )
    dynamo.putUserState( session, function ( data ) {
      console.log( data.message )
      response.askWithCard(
        json.speechOutput,
        json.repromptOutput,
        json.cardTitle,
        json.cardOutput,
        json.cardImage
      )
    })
  },

  exitWithCard: function ( scene, session, response ) {
    var json = buildResponse( scene, session )
    dynamo.putUserState( session, function ( data ) {
      console.log( data.message )
      response.tellWithCard(
        json.speechOutput,
        json.cardTitle,
        json.cardOutput,
        json.cardImage
      )
    })
  }

}

function buildResponse ( scene, session ){

  var voicePrompt = scene.voice.prompt.trim() || buildPrompt( scene, true, session )
  var cardPrompt  = scene.card.prompt.trim()  || buildPrompt( scene, false, session )

  return {

    // initial text spoken by Alexa
    speechOutput: {
      type: AlexaSkill.SPEECH_OUTPUT_TYPE.SSML,
      ssml: '<speak>' +
            scene.voice.intro.trim() +
            '<break time="200ms"/>' +
            voicePrompt +
            '</speak>'
    },

    // reprompt is played if there's 7 seconds of silence
    repromptOutput: {
      type: AlexaSkill.SPEECH_OUTPUT_TYPE.SSML,
      ssml: '<speak>' +
            'I\'m sorry.<break time="200ms"/>' +
            voicePrompt +
            '</speak>'
    },

    cardTitle:  scene.card.title || config.skillName,
    cardOutput: scene.card.text.trim() +
              ( scene.card.text.trim() && cardPrompt ? ' ' : '' ) +
                cardPrompt,

    cardImage: scene.card.image || null

  }

}

function buildPrompt ( scene, isForSpeech, session ) {
  var utils = require('./utils')
  var options = []

  if ( scene.voice.prompt ) return scene.voice.prompt.trim()

  var options = scene.options.filter( function ( option ) {

    var filteredScene = utils.findResponseBySceneId( option.sceneId );

    //check entry conditions for scene to filter to see if it can be shown if the entry conditions are met, regardless if its hidden or not
    return (!filteredScene.isHidden || (filteredScene.isHidden && filteredScene.entryConditions && filteredScene.entryConditions !== '' && utils.checkConditionString(filteredScene.entryConditions,session)));
  }).map( function ( option ) {
    return option.utterances[0]
  })

  var hasOptions = ( options.length > 0 )
  if ( ! hasOptions ) return ''

  var preamble = options.length > 1 ? 'You can say, ' : 'Say, '
  return assemble( preamble, options, isForSpeech )
}

function assemble ( preamble, options, isSpeech ) {
  var options = options.map( function ( option, index, array ) {
    if ( array.length > 1 && index === array.length -1 ) {
      return ( isSpeech ? '<break time="100ms" />' : '' ) + 'or “' + capitalize( option ) + '.”'
    }
    else if ( index == array.length -2 ){
      return '“' + capitalize( option ) + '”'
    }
    else if ( array.length === 1 ) {
      return '“' + capitalize( option ) + '.”'
    }
    else {
      return '“' + capitalize( option ) + ',”'
    }
  })
  return  preamble + options.join(' ')
}

function capitalize ( str ) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
