var processUtterance = require('./processUtterance')

module.exports = {
	"ResetStateIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "reset skill" )
	},
	"RestoreStateIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "resume skill" )
	},
	"RepeatOptionsIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "repeat options" )
	},
	"RepeatSceneIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "repeat scene" )
	},
	"GoBackIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "go back" )
	},
	"AMAZON.HelpIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "help" )
	},
	"AMAZON.StopIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "exit skill" )
	},
	"AMAZON.CancelIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "exit skill" )
	},
	"BeginIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "begin" )
	},
	"OpenDoorOneIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "open door 1" )
	},
	"OpenDoorTwoIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "open door 2" )
	},
	"OpenDoorThreeIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "open door 3" )
	},
	"OpenDoorFourIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "open door 4" )
	},
	"OpenDoorFiveIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "open door 5" )
	},
}