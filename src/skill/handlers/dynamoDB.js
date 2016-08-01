'use strict'

var fs = require('fs');
var AWS = require("aws-sdk")
var skill = require('../index').skill
var config = require('../models/config.json')

var LOCAL_CONTEXT = true

try {
  fs.accessSync( process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] + '/.aws')
} catch (e) {
  LOCAL_CONTEXT = false
}

// if this is being tested locally, load appropriate creds
if ( LOCAL_CONTEXT && config.awsProfileName ) {
  AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: config.awsProfileName })
}

var docClient = new AWS.DynamoDB.DocumentClient({ region: config.dynamoRegion || 'us-east-1' })

function putUserState ( session, cb ) {
  if ( ! config.dynamoTableName ) return cb({ message: 'ERROR: Dynamo DB table name was not provided', item: null }) // exit

  var params = {
    "TableName": config.dynamoTableName,
    "Item": {
      "userId": session.user.userId,
      "breadcrumbs": session.attributes.breadcrumbs,
      "currentSceneId": session.attributes.currentSceneId
    }
  }

  docClient.put( params, handler( cb ) )

}

function getUserState ( session, cb ) {
  if ( ! config.dynamoTableName ) return cb({ message: 'ERROR: Dynamo DB table name was not provided', item: null }) // exit

  var params = {
    "TableName": config.dynamoTableName,
    "Key": {
      "userId": session.user.userId
    },
    "AttributesToGet": [
      "currentSceneId",
      "breadcrumbs"
    ],
  }

  docClient.get( params, handler( cb ) )

}

function handler ( cb ) {
  return function ( err, data ) {
    if (err) {
      cb({
        message: "ERROR: Dynamo DB - " + JSON.stringify( err, null, 2 ),
        item: null
      })
    } else {
      cb({
        message: "SUCCESS: Dynamo DB",
        item: data.Item
      })
    }
  }
}

module.exports = {
  putUserState: putUserState,
  getUserState: getUserState
}
