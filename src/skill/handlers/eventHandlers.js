'use strict'

var dynamo = require('./dynamoDB')
var respond = require('./respond')
var skill = require('../index').skill
var utils = require('./utils')

var eventHandlers = {

  onSessionStarted: function ( sessionStartedRequest, session ) {
    // Overriden to show that a subclass can override
    // this function to initialize session state.
    // Any session init logic would go here.
  },

  onLaunch: function ( request, session, response ) {

    dynamo.getUserState( session, function ( data ) {
      if ( data.item && data.item.breadcrumbs.length ) {
        Object.assign( session.attributes, data.item )
        session.attributes.isAskingToRestoreState = true
        var scene = utils.findResponseByType('askToRestoreState')
        respond.readSceneWithCard( scene, session, response )
      }
      else {
        // no previous game
        request.intent = { name: "LaunchIntent", slots: {} }
        eventHandlers.onIntent( request, session, response )
      }
    })

  },

  onIntent: function ( request, session, response ) {

    var intentName = request.intent.name
    var intentHandler = skill.intentHandlers[ intentName ]

    if ( session.attributes.isAskingToRestoreState
    && intentName !== "AMAZON.HelpIntent"
    && intentName !== "AMAZON.StopIntent"
    && intentName !== "AMAZON.CancelIntent"
    && intentName !== "ResetStateIntent"
    && intentName !== "RepeatSceneIntent"
    && intentName !== "RepeatOptionsIntent"
    && intentName !== "RestoreStateIntent" ) {
      intentHandler = skill.intentHandlers["UnrecognizedIntent"]
    }

    if ( intentHandler ) {
      console.log('dispatch intent = ' + intentName )
      intentHandler.call( skill, request.intent, session, request, response )
    }
    else {
      console.log('--- ERROR >>>')
      console.log('Unsupported intent = ' + intentName )
      console.log('<<< ERROR ---')
    }

  },

  onSessionEnded: function (sessionEndedRequest, session) {
    // Overriden to show that a subclass can override
    // this function to teardown session state.
    // Any session cleanup logic would go here.
  }

}

module.exports = eventHandlers
