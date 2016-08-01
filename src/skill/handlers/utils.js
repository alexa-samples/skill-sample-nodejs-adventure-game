'use strict'

var config = require('../models/config.json')
var scenes = require('../models/scenes.json')

var utils = {

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
  }

}

module.exports = utils

function cloneScene ( scene ) {
  var scene   = Object.assign( {}, scene )
  scene.card  = Object.assign( {}, scene.card )
  scene.voice = Object.assign( {}, scene.voice )
  if ( 'options' in scene ) scene.options = scene.options.slice()
  return scene
}
