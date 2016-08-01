/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

'use strict'

function AlexaSkill( appId ) {
  this._appId = appId
}

AlexaSkill.SPEECH_OUTPUT_TYPE = {
  PLAIN_TEXT: 'PlainText',
  SSML: 'SSML'
}

AlexaSkill.prototype.requestHandlers = {
  LaunchRequest: function ( event, context, response ) {
    this.eventHandlers.onLaunch.call( this, event.request, event.session, response)
  },

  IntentRequest: function ( event, context, response ) {
    this.eventHandlers.onIntent.call( this, event.request, event.session, response)
  },

  SessionEndedRequest: function ( event, context ) {
    this.eventHandlers.onSessionEnded( event.request, event.session )
    context.succeed()
  }
}

AlexaSkill.prototype.eventHandlers = {
    onSessionStarted: function ( sessionStartedRequest, session ) {},

    onLaunch: function ( launchRequest, session, response ) {
        throw "onLaunch should be overriden by subclass";
    },

    onIntent: function ( intentRequest, session, response ) {
        var intent = intentRequest.intent,
            intentName = intentRequest.intent.name,
            intentHandler = this.intentHandlers[intentName];
        if ( intentHandler ) {
            console.log('dispatch intent = ' + intentName);
            intentHandler.call(this, intent, session, response);
        } else {
            throw 'Unsupported intent = ' + intentName;
        }
    },

    onSessionEnded: function ( sessionEndedRequest, session ) {}
};

AlexaSkill.prototype.intentHandlers = {};

AlexaSkill.prototype.execute = function ( event, context ) {
  try {

    // Validate that this request originated from authorized source.
    if (this._appId && event.session.application.applicationId !== this._appId) {
        console.log("The applicationIds don't match : " + event.session.application.applicationId + " and "
            + this._appId)
        throw "Invalid applicationId"
    }
    if (!event.session.attributes) {
        event.session.attributes = {}
    }
    if (event.session.new) {
        this.eventHandlers.onSessionStarted(event.request, event.session)
    }

    // Route the request to the proper handler which may have been overriden.
    var requestHandler = this.requestHandlers[ event.request.type ]
    requestHandler.call( this, event, context, new Response( context, event.session ))

  } catch ( e ) {
    console.log("Unexpected exception " + e )
    context.fail( e )
  }
}

var Response = function ( context, session ) {
  this._context = context
  this._session = session
}

function createSpeechObject( optionsParam ) {
  if (optionsParam && optionsParam.type === 'SSML') {
    console.log( optionsParam )
    return {
      type: optionsParam.type,
      ssml: optionsParam.ssml
    }
  } else {
    return {
      type: optionsParam.type || 'PlainText',
      text: optionsParam.speech || optionsParam
    }
  }
}

Response.prototype = (function () {

  return {
    tell: function ( speechOutput ) {
      this._context.succeed( buildSpeechletResponse({
        session: this._session,
        output: speechOutput,
        shouldEndSession: true
      }))
    },
    tellWithCard: function ( speechOutput, cardTitle, cardContent, cardImage ) {
      this._context.succeed( buildSpeechletResponse({
        session: this._session,
        output: speechOutput,
        cardTitle: cardTitle,
        cardContent: cardContent,
        cardImage: cardImage,
        shouldEndSession: true
      }))
    },
    ask: function ( speechOutput, repromptSpeech ) {
      this._context.succeed( buildSpeechletResponse({
        session: this._session,
        output: speechOutput,
        reprompt: repromptSpeech,
        shouldEndSession: false
      }))
    },
    askWithCard: function ( speechOutput, repromptSpeech, cardTitle, cardContent, cardImage ) {
      this._context.succeed( buildSpeechletResponse({
        session: this._session,
        output: speechOutput,
        reprompt: repromptSpeech,
        cardTitle: cardTitle,
        cardContent: cardContent,
        cardImage: cardImage,
        shouldEndSession: false
      }))
    }
  }

  function buildSpeechletResponse ( options ) {

    var alexaResponse = {
      outputSpeech: createSpeechObject( options.output ),
      shouldEndSession: options.shouldEndSession
    }

    if ( options.reprompt ) {
      alexaResponse.reprompt = {
        outputSpeech: createSpeechObject( options.reprompt )
      }
    }
    if ( options.cardTitle && options.cardContent ) {
      var type = "Standard"
      alexaResponse.card = {
        type: type,
        title: options.cardTitle,
        text: options.cardContent
      }
      if ( options.cardImage ) {
        alexaResponse.card.image = options.cardImage
      }
    }

    var returnResult = {
      version: '1.0',
      response: alexaResponse
    }

    if ( options.session && options.session.attributes ) {
      returnResult.sessionAttributes = options.session.attributes
    }

    return returnResult
  }

})()

module.exports = AlexaSkill
