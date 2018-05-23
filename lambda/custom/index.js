const Alexa = require('ask-sdk');
const fs = require('fs');
const xmlparser = require('xml2js');
// 0. Constants

const story = 'Escape the Office.html';
const TableName = story.replace('.html', '').replace(/\s/g, '-');
const linksRegex = /\[\[([^\|\]]*)\|?([^\]]*)\]\]/g;

let twine = null;

loadStory();

// 1. Intent Handlers =============================================

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {
    console.log('LaunchRequest');
    const responseBuilder = handlerInput.responseBuilder;
    const attributes = await handlerInput.attributesManager.getPersistentAttributes() || {};

    if (attributes.room) {
      const room = getRoomData(attributes.room);
      const reprompt = 'Say, resume game, or, new game.';
      const speechOutput = `Hello, you were playing before and got to the room called ${room.$.name}. Would you like to resume? `;
      const cardTitle = 'Restart';
      const cardContent = speechOutput;
      const imageObj = undefined;

      return responseBuilder
        .speak(speechOutput)
        .reprompt(reprompt)
        .withStandardCard(cardTitle, cardContent, imageObj)
        .getResponse();
    }
    return WhereAmI(handlerInput);
  },
};

const AmazonCancelHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.CancelIntent';
  },
  handle(handlerInput) {
    return CompletelyExit(handlerInput);
  },
};

const AmazonHelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;

    const reprompt = 'Say where am I, to hear me speak.';
    const speechOutput = `This is the Sample Gamebook Skill. ${reprompt}`;
    const cardTitle = 'Help.';
    const cardContent = speechOutput;
    const imageObj = undefined;
    return responseBuilder
      .speak(speechOutput)
      .reprompt(reprompt)
      .withStandardCard(cardTitle, cardContent, imageObj)
      .getResponse();
  },
};

const AmazonRepeatHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.RepeatIntent';
  },
  handle(handlerInput) {
    console.log('RepeatIntent');
    return WhereAmI(handlerInput);
  },
};

const AmazonStopHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.StopIntent';
  },
  handle(handlerInput) {
    return CompletelyExit(handlerInput);
  },
};

const ResumeGameHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'ResumeGame';
  },
  handle(handlerInput) {
    console.log('ResumeGame:');
    return WhereAmI(handlerInput);
  },
};

const RestartGameHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'RestartGame';
  },
  handle(handlerInput) {
    console.log('RestartGame:');
    // TODO convert to use attributes
    const request = handlerInput.requestEnvelope.request;
    const responseBuilder = handlerInput.responseBuilder;
    // clear session attributes
    this.event.session.attributes['room'] = undefined;
    this.event.session.attributes['visited'] = [];
    return WhereAmI(handlerInput);
  },
};

const GoHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'Go';
  },
  handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    const responseBuilder = handlerInput.responseBuilder;
    console.log('Go');
    // TODO finish conversion
    var slotValues = getSlotValues(this.event.request.intent.slots);
    followLink(this.event, [slotValues['direction']['resolved'], slotValues['direction']['synonym']]);
    return WhereAmI(handlerInput);
  },
};

const PageHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'Page';
  },
  handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    const responseBuilder = handlerInput.responseBuilder;
    // TODO finsih conversion
    // old-school cyoa: "to go south turn to page 20"..you say, "page 20"
    console.log('Page');
    followLink(this.event, this.event.request.intent.slots.number.value);
    return WhereAmI(handlerInput);
  },
};

const OpenHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'Open';
  },
  handle(handlerInput) {
    // TODO determine if open is still used/needed
    return WhereAmI(handlerInput);
  },
};

const LockHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'Lock';
  },
  handle(handlerInput) {
    // TODO determine if lock is still used/needed
    return WhereAmI(handlerInput);
  },
};

const JumpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'Jump';
  },
  handle(handlerInput) {
    // TODO dettermine if Jump is still used/needed
    return WhereAmI(handlerInput);
  },
};

const FightHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'Fight';
  },
  handle(handlerInput) {
    console.log('Fight');
    // TODO update follow link
    followLink(this.event, [this.event.request.intent.slots.npc.value, 'fight']);
    return WhereAmI(handlerInput);
  },
};

const SessionEndedHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  }
};

const UnhandledHandler = {
  canHandle(handlerInput) {
    return true;
  },
  handle(handlerInput) {
    // handle any intent in interaction model with no handler code
    console.log('Unhandled');
    followLink(handlerInput);
    return WhereAmI(handlerInput);
  }
}

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const request = handlerInput.requestEnvelope.request;

    console.log(`Error handled: ${error.message}`);
    console.log(`Original Request was: ${JSON.stringify(request, null, 2)}`);

    return handlerInput.responseBuilder
      .speak('Sorry, something went wrong.  Please try again.')
      .reprompt('Please try again.')
      .getResponse();
  },
};

const RequestLoggingInterceptor = {
  process(handlerInput) {
    console.log(`handlerInput: ${JSON.stringify(handlerInput)}`);
    return new Promise((resolve) => {
      resolve();
    });
  },
};

const ResponseLoggingInterceptor = {
  process(handlerInput) {
    console.log(`response: ${JSON.stringify(handlerInput)}`);
    return new Promise((resolve) => {
      resolve();
    });
  },
};

// 2. Constants ===========================================================================


// 3.  Helper Functions ===================================================================

function getRoomData(room) {
  let currentRoomData;
  for (let i = 0; i < twine.length; i++) {
    if (twine[i].$.pid === room) {
      currentRoomData = twine[i];
      break;
    }
  }
  return currentRoomData;
}

function followLink(handlerInput) {
  // TODO finsih convesion
  //  event, direction_or_array
  const event = handlerInput.event;
 
  const directionSlot = getSlotValues(handlerInput, 'direction')
  
  let result = undefined;
  let directions = [];
  
  if (direction_or_array instanceof Array) {
    directions = direction_or_array;
  } else {
    directions = [direction_or_array];
  }
  const room = getRoomData(attributes.room);
  directions.every(function (direction, index, _arr) {
    console.log(`followLink: try '${direction}' from ${room['$']['name']}`);
    var directionRegex = new RegExp(`.*${direction}.*`, 'i');
    let links;
    linksRegex.lastIndex = 0;
    while ((links = linksRegex.exec(room['_'])) !== null) {
      if (links.index === linksRegex.lastIndex) {
        linksRegex.lastIndex++;
      }
      result = links[1].match(directionRegex);
      var target = links[2] || links[1];
      console.log(`followLink: check ${links[1]} (${target}) for ${direction} => ${result} `);
      if (result) {
        console.log(`followLink: That would be ${target}`);
        for (var i = 0; i < $twine.length; i++) {
          if ($twine[i]['$']['name'].toLowerCase() === target.toLowerCase()) {
            event.session.attributes['room'] = $twine[i]['$']['pid'];
            break;
          }
        }
        break;
      }
    }
    return !result;
  });
}

async function loadStory() {
  // read the Twine 2 (Harlowe) story into JSON
  // does this only once, so it is cached for the lifetime of the lambda
  const contents = await fs.readFileSync(story, 'utf8');
  const m = contents.match(/<tw-storydata [\s\S]*<\/tw-storydata>/g);
  let xml = m[0];
  // because Twine xml has an attribute with no value
  xml = xml.replace('hidden>', 'hidden="true">');
  const parseString = xmlparser.parseString;
  await parseString(xml, function (err, result) {
    twine = result['tw-storydata']['tw-passagedata'];
  });
}

function WhereAmI(handlerInput) {
  // TODO finsih conversion
  const responseBuilder = handlerInput.responseBuilder;
  let speechOutput = '';
  let reprompt = '';
  let room;
  if (attributes.room === undefined) {
    // you just started so you are in the first room
    room = twine[0].$.pid;
    speechOutput = `Welcome to ${story.replace('.html', '')}. Lets start your game. `;
  } else {
    room = attributes.room;
  }

  const roomData = getRoomData(room);
  console.log(`WhereAmI: in ${JSON.stringify(roomData)}`);

  // get displayable text
  // e.g "You are here. [[Go South|The Hall]]" -> "You are here. Go South"
  let displayableText = roomData['_'];
  linksRegex.lastIndex = 0;
  let m;
  while ((m = linksRegex.exec(displayableText)) !== null) {
    displayableText = displayableText.replace(m[0], m[1]);
    linksRegex.lastIndex = 0;
  }
  // strip html
  displayableText = displayableText.replace(/<\/?[^>]+(>|$)/g, '');
  displayableText = displayableText.replace('&amp;', 'and');
  speechOutput += displayableText;

  // create reprompt from links: "You can go north or go south"
  linksRegex.lastIndex = 0;
  while ((m = linksRegex.exec(room['_'])) !== null) {
    if (m.index === linksRegex.lastIndex) {
      linksRegex.lastIndex++;
    }
    if (reprompt === '') {
      if (!m[1].toLowerCase().startsWith('if you')) {
        reprompt = 'You can';
      }
    } else {
      reprompt = `${reprompt} or`;
    }
    reprompt = `${reprompt} ${m[1]}`;
  }

  const firstSentence = displayableText.split('.')[0];
  const lastSentence = displayableText.replace('\n', ' ').split('. ').pop();
  const reducedContent = `${firstSentence}. ${reprompt}.`;

  // say less if you've been here before
  if (attributes.visited === undefined) {
    attributes.visited = [];
  }
  if (attributes.visited.includes(room['$']['pid'])) {
    console.log('WhereAmI: player is revisiting');
    speechOutput = reducedContent;
  } else {
    attributes.visited.push(room['$']['pid']);
  }

  const cardTitle = firstSentence;
  const cardContent = (reprompt > '') ? reprompt : lastSentence;
  const imageObj = undefined;

  linksRegex.lastIndex = 0;
  if (linksRegex.exec(room['_'])) {
    // room has links leading out, so listen for further user input
    return responseBuilder
      .speak(speechOutput)
      .reprompt(reprompt)
      .withStandardCard(cardTitle, cardContent, imageObj);
  }
  console.log('WhereAmI: at the end of a branch. Game over.');
  // clear session attributes
  attributes.room = undefined;
  attributes.visited = [];
  return responseBuilder
    .speak(speechOutput)
    .withStandardCard(cardTitle, cardContent, imageObj);
}

function CompletelyExit(handlerInput) {
  const responseBuilder = handlerInput.responseBuilder;
  let speechOutput = 'Goodbye.';
  if (TableName) {
    speechOutput = `Your progress has been saved. ${speechOutput}`;
  }
  const cardTitle = 'Exit.';
  const cardContent = speechOutput;
  const imageObj = undefined;
  return responseBuilder
    .speak(speechOutput)
    .withStandardCard(cardTitle, cardContent, imageObj)
    .getResponse();
}

function resolveCanonical(slot) {
  let canonical = '';
  if (slot.hasOwnProperty('resolutions')) {
    canonical = slot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
  } else {
    canonical = slot.value;
  }
  return canonical;
}


function getSlotValues(filledSlots) {
  const slotValues = {};

  console.log(`The filled slots: ${JSON.stringify(filledSlots)}`);
  Object.keys(filledSlots).forEach((item) => {
    const name = filledSlots[item].name;

    if (filledSlots[item] &&
      filledSlots[item].resolutions &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
      switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
        case 'ER_SUCCESS_MATCH':
          slotValues[name] = {
            synonym: filledSlots[item].value,
            resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
            isValidated: true
          };
          break;
        case 'ER_SUCCESS_NO_MATCH':
          slotValues[name] = {
            synonym: filledSlots[item].value,
            resolved: filledSlots[item].value,
            isValidated: false
          };
          break;
        default:
          break;
      }
    } else {
      slotValues[name] = {
        synonym: filledSlots[item].value,
        resolved: filledSlots[item].value,
        isValidated: false
      };
    }
  }, this);

  return slotValues;
}

// 4. Exports handler function and setup ===================================================
const skillBuilder = Alexa.SkillBuilders.standard();
exports.handler = skillBuilder
  .addRequestHandlers(
    AmazonCancelHandler,
    AmazonHelpHandler,
    AmazonRepeatHandler,
    AmazonStopHandler,
    ResumeGameHandler,
    RestartGameHandler,
    GoHandler,
    PageHandler,
    OpenHandler,
    LockHandler,
    JumpHandler,
    FightHandler,
    LaunchRequestHandler,
    SessionEndedHandler,
    UnhandledHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .addRequestInterceptors(RequestLoggingInterceptor)
  .addResponseInterceptors(ResponseLoggingInterceptor)
  .withTableName(TableName)
  .withAutoCreateTable(true)
  .lambda();


// End of Skill code -------------------------------------------------------------
