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
  var actualCurrentScene = utils.findResponseBySceneId( session.attributes.currentSceneId )

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
    var actualNextScene = utils.findNextScene( actualCurrentScene, option );

    var alreadyResponded = false;

    //set session flags on exit if the current scene specifies their values
    if(actualCurrentScene.setSessionFlagsOnExit && actualCurrentScene.setSessionFlagsOnExit !== ''){
      var flags = actualCurrentScene.setSessionFlagsOnExit.split("\n");
      flags.forEach(function(flag){
        var flagArray = flag.split('=');
        var flagKey = flagArray[0];
        var flagValue = flagArray[1];

        session.attributes.flags[flagKey] = flagValue;
      });
    }

    //check entry conditions for next scene to make sure user can actually enter
    if(actualNextScene.entryConditions && actualNextScene.entryConditions !== ''){

      if(!utils.checkConditionString(actualNextScene.entryConditions,session)){
        alreadyResponded = true;
        respond.readSceneWithCard( utils.getModifiedScene(actualNextScene,'reject'), session, response );
      }
    }

    //check alternate conditions for next scene to see if alternate card and voice needs to be used instead
    if(actualNextScene.alternateConditions && actualNextScene.alternateConditions !== ''){

      if(utils.checkConditionString(actualNextScene.alternateConditions,session)){
        alreadyResponded = true;
        respond.readSceneWithCard( utils.getModifiedScene(actualNextScene,'alternate'), session, response );
      }
    }
    
    console.log('Currentscene: ',currentScene);
    console.log('Nextscene: ',nextScene);

    //set session flags on enter if the next scene specifies their values
    if(actualNextScene.setSessionFlagsOnEnter && actualNextScene.setSessionFlagsOnEnter !== ''){
      var flags = actualNextScene.setSessionFlagsOnEnter.split("\n");
      flags.forEach(function(flag){
        var flagArray = flag.split('=');
        var flagKey = flagArray[0];
        var flagValue = flagArray[1];

        session.attributes.flags[flagKey] = flagValue;
      });
    }

    session.attributes.breadcrumbs.push( currentScene.id )
    session.attributes.currentSceneId = nextScene.id

    if(!alreadyResponded){
      respond.readSceneWithCard( nextScene, session, response )
    }
  }

  // no match
  else {
    intentHandlers.UnrecognizedIntent( intent, session, request, response )
  }

}

module.exports = processUtterance
