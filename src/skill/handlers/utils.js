'use strict'

var config = require('../models/config.json')
var scenes = require('../models/scenes.json')

var utils = {

  checkEntryConditionString: function(inputString,session) {

    var conditions = inputString.split("\n");
    var conditionString = '';

    //skip check if flags are empty
    if(session.attributes.flags.length === 0){
      return false;
    }

    for(var i = 0; i < conditions.length; i++){
      var condition = conditions[i];
      var conditionArray = condition.split('=');
      var conditionKey = conditionArray[0];

      switch(conditionKey){
        case 'AND':
          //is logical AND
          conditionString += ' && ';
          break;
        case 'OR':
          //is logical OR
          conditionString += ' || ';
          break;
        case 'NOT':
          //is logical NOT
          conditionString += '!';
          break;
        case 'GROUPSTART':
          //is (
          conditionString +='(';
          break;
        case 'GROUPEND':
          //is (
          conditionString +=')';
          break;
        default:
          //is regular condition
          var conditionValue = conditionArray[1];
          conditionString += 'session.attributes.flags[\''+conditionKey+'\'] === \''+conditionValue+'\'';
          break;
      }
    }



    return eval(conditionString);
  },

  getSkillName: function () {
    return config.skillName
  },

  getCommandsForIntent: function ( intentName ) {
    return config.commands[ intentName ]
  },

  findFirstScene: function () {
    return scenes[0]
  },

  findResponseByType: function ( type ) {
    return cloneScene( config.responses[ type ] )
  },

  findResponseBySceneId: function ( sceneId ) {
    var scene = scenes.find( function ( scene ) {
      return scene.id === sceneId
    })
    return cloneScene( scene )
  },

  findNextScene: function ( currentScene, option ) {
    var nextScene = utils.findResponseBySceneId( option.sceneId )
    if ( nextScene.readPreviousOptions ) {
      var index = currentScene.options.indexOf( option )
      currentScene.options.splice( index , 1 ) // remove current option
      nextScene.options = currentScene.options
    }
    return nextScene
  },

  findPreviousScene: function ( session ) {
    var sceneId = session.attributes.breadcrumbs[ session.attributes.breadcrumbs.length -1 ]
    return utils.findResponseBySceneId( sceneId )
  },

  cloneScene: function( scene ) {
    return cloneScene(scene);
  },

  getRejectScene: function( scene ) {
    var rejectScene = scene;//utils.cloneScene(scene);

    //set the card and voice to be the rejected one
    rejectScene.card = rejectScene.rejectCard;
    rejectScene.voice = rejectScene.rejectVoice;

    return rejectScene;
  }

}

module.exports = utils

function cloneScene ( scene ) {
  var scene   = Object.assign( {}, scene )
  scene.card  = Object.assign( {}, scene.card )
  scene.rejectCard  = Object.assign( {}, scene.rejectCard )
  scene.voice = Object.assign( {}, scene.voice )
  scene.rejectVoice = Object.assign( {}, scene.rejectVoice )
  if ( 'options' in scene ) scene.options = scene.options.slice()
  return scene
}
