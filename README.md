#  Build An Alexa Gamebook Skill
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/header._TTH_.png" />


This Alexa sample skill is a template for a basic gamebook skill. Provided with a branching text adventure from the Twine 2 platform, Alexa will let you play a game.

If this is your first time here, you're new to Alexa Skills Development, or you're looking for more detailed instructions, click the **Get Started** button below:

<p align='center'>
<a href='./instructions/0-intro.md'><img src='https://camo.githubusercontent.com/db9b9ce26327ad3bac57ec4daf0961a382d75790/68747470733a2f2f6d2e6d656469612d616d617a6f6e2e636f6d2f696d616765732f472f30312f6d6f62696c652d617070732f6465782f616c6578612f616c6578612d736b696c6c732d6b69742f7475746f7269616c732f67656e6572616c2f627574746f6e732f627574746f6e5f6765745f737461727465642e5f5454485f2e706e67'></a>
</p>


Be sure to take a look at the [Additional Resources](#additional-resources) at the bottom of this page!


## About
**Note:** The rest of this readme assumes you have your developer environment ready to go and that you have some familiarity with CLI (Command Line Interface) Tools, [AWS](https://aws.amazon.com/), and the [ASK Developer Portal](https://developer.amazon.com/alexa-skills-kit). If not, [click here](./instructions/0-intro.md) for a more detailed walkthrough.



### Usage

```text
Alexa, ask Text Adventure where am I?
	>> You are in the main hall of a large castle. Heavy tapestries hang from the walls...
```
```text
Alexa, start Text Adventure
	>> You're in a small office, there is a door to your left...
```

### Repository Contents
* `/.ask`	- [ASK CLI (Command Line Interface) configuration](https://developer.amazon.com/docs/smapi/ask-cli-intro.html)	 
* `/instructions` - Step-by-step instructions for getting started
* `/lambda/custom` - Back-end logic for the Alexa Skill hosted on [AWS Lambda](https://aws.amazon.com/lambda/)
* `/models/en-US.json` - ASK CLI interaction model for US English
* `skill.json`	- [Skill Manifest](https://developer.amazon.com/docs/smapi/skill-manifest.html)

## Setup w/ ASK CLI

### Pre-requisites

* Node.js (> v4.3)
* Register for an [AWS Account](https://aws.amazon.com/)
* Register for an [Amazon Developer Account](https://developer.amazon.com/)
* Install and setup [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)

### Installation
1. Clone the repository.

	```bash
	$ git clone https://github.com/alexa/skill-sample-gamebook/
	```

2. Initialize the [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html) by navigating into the repository and running npm command: `ask init`. Follow the prompts.

	```bash
	$ cd skill-sample-gamebook
	$ ask init
	```

3. Install npm dependencies by navigating into the `lambda/custom` directory and running the npm command: `npm install`

	```bash
	$ cd lambda/custom
	$ npm install
	```


### Deployment

ASK CLI will create the skill and the Lambda function for you. The Lambda function will be created in ```us-east-1 (Northern Virginia)``` by default.

1. Deploy the skill and the Lambda function in one step by running the following command:

	```bash
	$ ask deploy
	```

### Testing

1. Log in to the [Alexa Developer Console](https://developer.amazon.com/edw/home.html#/skills), open your skill, and from the **Test** tab enable the **Test switch**.

2. Simulate verbal interaction with your skill through the command line using the following example:

	```bash
	 $ ask simulate -l en-US -t "start Text Adventure"

	 ✓ Simulation created for simulation id: 4a7a9ed8-94b2-40c0-b3bd-fb63d9887fa7
	◡ Waiting for simulation response{
	  "status": "SUCCESSFUL",
	  ...
	 ```

3. With the **Test switch** enabled, your skill can also be tested on devices associated with your developer account. Speak to Alexa through any enabled physical device, through your browser with [echosim.io](https://echosim.io/welcome), or through your Amazon Mobile App and say:

	```text
	start Text Adventure
	```

## Customization

1. Amend ```./skill.json```

	Change the skill name, example phrase, icons, testing instructions, etc ...

	Remember that interaction models are locale-specific and must be changed for each locale (en-US, en-GB, de-DE, etc.).

	See the Skill [Manifest Documentation](https://developer.amazon.com/docs/smapi/skill-manifest.html) for more information.

2. Amend ```./lambda/custom/index.js```

	Modify messages, and facts from the source code to customize the skill.

3. Amend ```./models/*.json```

	Change the model definition to replace the invocation name and the sample phrase for each intent.  Repeat the operation for each locale you are planning to support.

4. Open the [Twine 2 online editor](http://twinery.org/2)

	Twine 2 is a text adventure authoring platform. It is capable of creating quite complex standalone games using variables and plug-ins. For our purposes we use it to create a simple text-and-choice-based branching game.

	Note that we are **not** using Twine variables. We leave this as a programming task for any enthused developers.

	You can use the online editor or download and install it as a desktop app.

	We aren't going to teach you how to use Twine here, but if you import the sample game it will give you a head-start.

	Later, when you are developing your own Alexa skills, remember that Twine can be very useful for designing voice interaction flows.

5. Import and play the sample game

	In the main right-hand menu click on **Import From File**.

	Import the sample game [Escape the Office.html](../lambda/custom/Escape the Office.html)

## Additional Resources

### Community
* Our team of evangelists run [online office hours every Tuesday from 1-2pm Pacific Time](https://attendee.gotowebinar.com/rt/8389200425172113931).
* [Amazon Developer Forums](https://forums.developer.amazon.com/spaces/165/index.html) - Join the conversation!
* [Hackster.io](https://www.hackster.io/amazon-alexa) - See what others are building with Alexa.
* [Alexa Developers Slack Channel](http://www.alexaslack.com/) - Chat with other Alexa developers. This is not an official Amazon channel.

### Tutorials & Guides
* [Voice Design Guide](https://developer.amazon.com/designing-for-voice/) - A great resource for learning conversational and voice user interface design.
* [CodeAcademy: Learn Alexa](https://www.codecademy.com/learn/learn-alexa) - Learn how to build an Alexa Skill from within your browser with this beginner friendly tutorial on CodeAcademy!

### Documentation
* [Official Alexa Skills Kit Node.js SDK](https://www.npmjs.com/package/alexa-sdk) - The Official Node.js SDK Documentation
*  [Official Alexa Skills Kit Documentation](https://developer.amazon.com/docs/ask-overviews/build-skills-with-the-alexa-skills-kit.html) - Official Alexa Skills Kit Documentation
