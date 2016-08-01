'use strict'

var config = require('../models/config')
var skill = require('../index').skill
var respond = require('./respond')
var utils = require('./utils')

function processUtterance ( intent, session, request, response, utterance ) {

  utterance = ( utterance || '' ).toLowerCase()

  var intentHandlers = skill.intentHandlers

  Object.keys( config.commands ).forEach( function ( intentName ) {
    if ( utils.getCommandsForIntent( intentName) .indexOf( utterance ) > -1 ) {
      intentHandlers[ intentName ]( intent, session, request, response )
      return // exit
    }
  })

  var currentScene = utils.findResponseBySceneId( session.attributes.currentSceneId )

  if (!currentScene || !currentScene.options) {
    intentHandlers["LaunchIntent"](intent, session, request, response)
    return
  }

  // incase this scene uses the previous scenes options
  if ( currentScene.readPreviousOptions ) {
    var previousSceneId = session.attributes.breadcrumbs[ session.attributes.breadcrumbs.length -1 ]
    currentScene = utils.findResponseBySceneId( previousSceneId )
  }

  var option = currentScene.options.find( function ( option ) {
    return ( option.utterances.indexOf( utterance ) > -1 )
  })

  // option found
  if ( option ) {
    var nextScene = utils.findNextScene( currentScene, option );
    session.attributes.breadcrumbs.push( currentScene.id )
    session.attributes.currentSceneId = nextScene.id
    respond.readSceneWithCard( nextScene, session, response )
  }

  // no match
  else {
    intentHandlers.UnrecognizedIntent( intent, session, request, response )
  }

}

module.exports = processUtterance
