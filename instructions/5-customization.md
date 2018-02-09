# Build An Alexa Gamebook Skill
[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png)](./1-voice-user-interface.md)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png)](./2-lambda-function.md)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-locked._TTH_.png)](./3-connect-vui-to-code.md)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-locked._TTH_.png)](./4-testing.md)[![Customization](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-on._TTH_.png)](./5-customization.md)[![Publication](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png)](./6-publication.md)

## Customize The Skill To Be Yours

You should have a working copy of the skill at this point. Customize it with new data and responses to make it your own.  Here are some things you can do:

1.  **Additional data.** Edit the Twine game to have an extra room or say something different.

    Our Skill has been automatically splitting the text in the Twine game to attempt to make a good interactive flow for the user. VUI design is a subtle art of presenting information clearly without it feeling awkward to the user. The reprompt is constructed from the links so that it doesn't repeat the entire room description and, similarly, if a player revisits a room they only hear the first sentence of the description. You might want to fine-tune what is said.

    1. Open the [Twine 2 online editor](http://twinery.org/2)

        Twine 2 is a text adventure authoring platform. It is capable of creating quite complex standalone games using variables and plug-ins. For our purposes we use it to create a simple text-and-choice-based branching game.

        Note that we are **not** using Twine variables. We leave this as a programming task for any enthused developers.

        You can use the online editor or download and install it as a desktop app.

        We aren't going to teach you how to use Twine here, but if you import the sample game it will give you a head-start.

        Later, when you are developing your own Alexa skills, remember that Twine can be very useful for designing voice interaction flows.

    2. Import and play the sample game

        In the main right-hand menu click on **Import From File**.

        Import the sample game [Escape the Office.html](../lambda/custom/Escape the Office.html)

    3. Press **Play**.

    4. Add a room or change some of the wording.

    5. Make sure it still plays as a game.

    6. Export the updated game with **Publish To File** from the menu obtained by clicking on the project name in the bottom left-hand corner.

    7.  Copy the contents of your file to your Lambda function.  This should be as simple as copying the text, and pasting it into the code box for your Lambda.

        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/5-1-5-lambda-code-box._TTH_.png" />

2.  **Different wording for an action.** You may find that you have a link that does not get triggered when you ask it.
    *  In Alexa Developer Console add to the interaction model. Consider adding variations on the **Sample Utterances**.
    *  Save and build the model.
    *  Under **Test** use the **Service Simulator** to show that your new wording can be understood.

3.  **New sentences to respond to your users.** The game skill comes with a number of standard intents, but there may be a new one that you want to react to.
    *  In Alexa Developer Console add to the interaction model.
    *  Save and build the model.
    *  Go back to your copy of **[index.js](../lambda/custom/index.js)**.
    *  Look for the section of intent handlers and add your new one. Most of our intents run the same method: a regex search of the link display texts.
    *  Copy and paste your new index.js code to Lambda.
    *  Under **Test** use the **Service Simulator** to show that your new wording can be understood

4.  **Write your own game from scratch.** You've seen how it works, you could easily write your own game from scratch.

5.  **New language.** If you are creating this skill for a language other than English, you will need to make sure Alexa's responses are also in that language.

    For example, if you are creating your skill in German, every single response that Alexa makes has to be in German.  You can't use English responses or your skill will fail certification.

6.  **Persistence.** You may not have noticed in this flurry of activity that the game remembers which room you are in.

    Each call to a Lambda function is completely separate to any preceding it, so the contents of variables are not retained. There is no state between calls.

    Alexa cleverly handles this by including any data you set in event.session.attributes within the conversation between Lambda and an Alexa device. Your data is tacked on to the JSON message sent to the device. When the user responds, a new message is sent from the device to your Lambda app including your data. As far as your program is concerned, the variable value will have been persisted between calls. For example:

    ```javascript
    this.event.session.attributes['myVariable'] = 'my value';
    ```

    In this game we used it to remember which **room** you are in and which rooms you have **visited**. You can see this happening in the **Service Simulator**.

    When a game session ends (after you say nothing to a reprompt or quit the app) those variable values would be lost. You must persist the state in a database in order to pick up where you left off. You could code this yourself, or use the DynamoDB persistence provided by alexa-sdk. A NoSQL database like DynamoDB is a good choice for this sort of persistence as records are only ever going to be accessed for a single user at a time, and it scales very well.

    A single line in the code asks alexa-sdk to persist the current variables into a DynamoDB table keyed on the Alexa UserId.
    * Uncomment the line that sets the DynamoDB table name.

    ```javascript
    const TableName = story.replace('.html','').replace(/\s/g, "-");
    ```
    * Copy the code up to your Lambda.
    * Your Lambda code needs permission to create a new DynamoDB table and read/write to it.
    * In the Developer Console, go to the IAM manager.
    * Under **Roles** find the role that was created for your Lambda function.
    * In the bottom right corner click on **Add inline policy** and add the following JSON:

    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Action": [
                    "dynamodb:CreateTable"
                ],
                "Resource": "arn:aws:dynamodb:*:*:*",
                "Effect": "Allow"
            }
        ]
    }
    ```
    * Give it a name like **DynamoDBTableCreator**.
    * The next time you use the app wait up to 5 minutes whilst the DynamoDB table is created. You can watch this being created in the [AWS DynamoDB Console](https://console.aws.amazon.com/dynamodb/).
    * Then the state will be saved between games. Note how the game tells you that it is saving when you quit, and it asks you about resuming the game when you restart the Skill.

7.  Once you have made some updates, you should have a good flavor of Alexa game development. Go and have a party! You could now move on to **Publication** and certification of your skill.

## Challenges

The skill code here could be used to make a reasonable text adventure for live release. It would also make a starting point for something far more complex. Your challenges, should you choose to accept them, are to make:

1. a way to pick up a key in one room and use it to unlock a door in another room.

2. a way to battle non-playing characters (NPCs) by keeping track of health and hit points.

3. a way to parse the code logic that can be embedded within a Twine 2 story.

4. use alexa-sdk state management to have a 'restart mode' and a 'gameplay mode'.

5. you should always be monitoring your Alexa Skill to see if users are saying the phrases that you were expecting. Add instrumentation via the console.log or an external product to report on utterances that failed, or are commonly used but not in your lists.

6. amend how html is stripped out of the text to avoid removing SSML. Play sound effects as part of your game.
   ```javascript
   displayableText = displayableText.replace(/<\/?[^>]+(>|$)/g, "");
   ```

7. optimize for screens by using the [List Templates](https://developer.amazon.com/docs/custom-skills/display-interface-reference.html)



<br/><br/>
<a href="./6-publication.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_publication._TTH_.png" /></a>

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>
