'use strict'

var utils = require('./utils')
var respond = require('./respond')

var defaultIntentHandlers = {

  "LaunchIntent": function ( intent, session, request, response ) {
    session.attributes.breadcrumbs = []
    session.attributes.currentSceneId = utils.findFirstScene().id
    var scene = utils.findResponseBySceneId( session.attributes.currentSceneId )
    respond.readSceneWithCard( scene, session, response )
  },

  "GoBackIntent": function ( intent, session, request, response ) {
    if ( session.attributes.isAskingToRestoreState ) {
      return defaultIntentHandlers["UnrecognizedIntent"]( intent, session, request, response )
    }
    if ( session.attributes.breadcrumbs && session.attributes.breadcrumbs.length ) {
      session.attributes.currentSceneId = session.attributes.breadcrumbs.pop()
    }
    var scene = utils.findResponseBySceneId( session.attributes.currentSceneId )
    respond.readSceneWithCard( scene, session, response )
  },

  "RepeatSceneIntent": function ( intent, session, request, response ) {
    var scene
    if ( session.attributes.isAskingToRestoreState ) {
      scene = utils.findResponseByType('askToRestoreState')
    }
    else {
      scene = utils.findResponseBySceneId( session.attributes.currentSceneId )
      if ( scene.readPreviousOptions ) {
        var previousScene = utils.findPreviousScene( session )
        var index = previousScene.options.findIndex( function ( option ) {
          return option.sceneId === scene.id
        })
        previousScene.options.splice( index , 1 ) // remove current option
        scene.options = previousScene.options
      }
    }
    respond.readSceneWithCard( scene, session, response )
  },

  "RepeatOptionsIntent": function ( intent, session, request, response ) {
    var scene
    if ( session.attributes.isAskingToRestoreState ) {
      scene = utils.findResponseByType('askToRestoreState')
    }
    else {
      scene = utils.findResponseBySceneId( session.attributes.currentSceneId )
    }
    scene.voice.intro = ''
    scene.card.text = ''
    respond.readSceneWithCard( scene, session, response )
  },

  "UnrecognizedIntent": function ( intent, session, request, response ) {
    var scene
    var unrecognized = utils.findResponseByType('unrecognized')
    if ( session.attributes.isAskingToRestoreState ) {
      scene = utils.findResponseByType('askToRestoreState')
      unrecognized.voice.prompt = scene.voice.prompt
    }
    else {
      scene = utils.findResponseBySceneId( session.attributes.currentSceneId )
      unrecognized.generateOptions = scene.generateOptions
      unrecognized.voice.prompt = scene.voice.prompt
      unrecognized.options = scene.options
    }
    respond.readSceneWithCard( unrecognized, session, response )
  },

  "ResetStateIntent": function ( intent, session, request, response ) {
    session.attributes.breadcrumbs = []
    delete session.attributes.isAskingToRestoreState
    session.attributes.currentSceneId = utils.findFirstScene().id
    var scene = utils.findResponseBySceneId( session.attributes.currentSceneId )
    respond.readSceneWithCard( scene, session, response )
  },

  "RestoreStateIntent": function ( intent, session, request, response ) {
    if ( session.attributes.isAskingToRestoreState ) {
      // if asking to resume previous state
      delete session.attributes.isAskingToRestoreState
      defaultIntentHandlers["RepeatSceneIntent"]( intent, session, request, response )
    }
    else {
      defaultIntentHandlers["UnrecognizedIntent"]( intent, session, request, response )
    }
  },

  // GLOBAL INTENTS
  "AMAZON.HelpIntent": function ( intent, session, request, response ) {
    var help = utils.findResponseByType('help')
    respond.readSceneWithCard( help, session, response )
  },

  "AMAZON.CancelIntent": function ( intent, session, request, response ) {
    defaultIntentHandlers["AMAZON.StopIntent"]( intent, session, request, response )
  },

  "AMAZON.StopIntent": function ( intent, session, request, response ) {
    var exit = utils.findResponseByType('exit')
    respond.exitWithCard( exit, session, response )
  }

}

module.exports = defaultIntentHandlers
