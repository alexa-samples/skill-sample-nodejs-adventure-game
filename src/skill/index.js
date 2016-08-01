'use strict'

require('./polyfills')

var AlexaSkill = require('./AlexaSkill')
var config = require('./models/config.json')

// extends AlexaSkill
var MySkill = function ( APP_ID ) { AlexaSkill.call( this, APP_ID ) }
MySkill.prototype = Object.create( AlexaSkill.prototype )
MySkill.prototype.constructor = MySkill

var skill = new MySkill( config.applicationId )

module.exports.skill = skill
module.exports.handler = skill.execute.bind( skill )

skill.eventHandlers = require('./handlers/eventHandlers')
skill.intentHandlers = Object.assign(
  {},
  require('./handlers/intentHandlers_generated'),
  require('./handlers/intentHandlers_default')
)
