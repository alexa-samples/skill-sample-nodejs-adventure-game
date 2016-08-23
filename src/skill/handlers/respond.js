'use strict'

var AlexaSkill = require('../AlexaSkill')
var dynamo = require('./dynamoDB')

module.exports = {

  readSceneWithCard: function ( scene, session, response ) {
    var json = buildResponse( scene )
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
    var json = buildResponse( scene )
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

function buildResponse ( scene ){

  var voicePrompt = scene.voice.prompt.trim() || buildPrompt( scene, true )
  var cardPrompt  = scene.card.prompt.trim()  || buildPrompt( scene, false )

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

function buildPrompt ( scene, isForSpeech ) {
  var utils = require('./utils')
  var options = []

  if ( scene.voice.prompt ) return scene.voice.prompt.trim()

  //TODO: add support for returning utterances of the option items in the scene along with the list of other scenes the
  //player can travel to.
  //need to add a new property to the options objects to define if it is a scene or item. Items should reference itemId
  //item options should also have the isHidden property to define if they are invisible in the scene description

  /*

   "options": [
   {
      "utterances": [
        "open door 1"
      ],
      "sceneId": 2
   },
   {
      "utterances": [
        "open door 2"
      ],
      "sceneId": 3
   },
   {
      "utterances": [
        "open door 3"
      ],
      "sceneId": 4
      },
   {
      "utterances": [
        "open door 4"
      ],
      "sceneId": 5
   },
   {
      "utterances": [
        "pick up red key"
      ],
      "itemId": 1
   },
   {
      "utterances": [
        "pick up blue key"
      ],
      "itemId": 2
   }]


   */

  var options = scene.options.filter( function ( option ) {
    return ! utils.findResponseBySceneId( option.sceneId ).isHidden
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
