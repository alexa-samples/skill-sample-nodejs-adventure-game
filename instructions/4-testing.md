# Build An Alexa Gamebook Skill
[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png)](./1-voice-user-interface.md)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png)](./2-lambda-function.md)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-locked._TTH_.png)](./3-connect-vui-to-code.md)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-on._TTH_.png)](./4-testing.md)[![Customization](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-off._TTH_.png)](./5-customization.md)[![Publication](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png)](./6-publication.md)

## Testing Your Alexa Skill

We have created a [Voice User Interface](./1-voice-user-interface.md) and a [Lambda function](./2-lambda-function.md), and [connected the two together](./3-connect-vui-to-lambda.md).  Your skill is now ready to test.

1.  Go back to the [Amazon Developer Portal](https://developer.amazon.com/edw/home.html#/skills/list) and select your skill from the list. You may still have a browser tab open if you started at the beginning of this tutorial.

2.  Open the **Test** tab on the left side.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-2-test-tab._TTH_.png" />

3.  Try out the **Voice Simulator**. While it's not specific to your skill, the Voice Simulator is a valuable testing tool for every skill. Type a word into the box and click the **Listen** button to hear how Alexa will pronounce it. To make changes to her pronunciation, use Speech Synthesis Markup Language [(SSML)](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference). Try these examples:

    ```html
    <say-as interpret-as="number">12345</say-as>
    ```

    ```html
    <say-as interpret-as="ordinal">12345</say-as>
    ```

    ```html
    <say-as interpret-as="digits">12345</say-as>
    ```

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-3-voice-simulator._TTH_.png" />

    Return to the Voice Simulator as needed to ensure that Alexa says words and phrases as you would expect.

4.  Test your skill with the **Service Simulator**. Type **where am I** into the **Enter Utterance** text box.

    <img src="4-4-service-simulator._TTH_.png" />

    ### Service Simulator Tips
    * After you click the "Ask [Your Skill Name]" button, you should see the **Lambda Request** and **Lambda Response** boxes get populated with JSON data like in the screenshot above.
    * Click the **Listen** button in the bottom right corner to hear Alexa read the response.
    * If you receive a response that reads: *"The remote endpoint could not be called, or the response it returned was invalid,"* this is an indication that something is broken.  Take a look at the logs, and/or AWS Lambda offers an additional testing tool to help with troubleshooting.

5.  Lambda sends **logs** to **CloudWatch**. Go to [CloudWatch logs section](https://console.aws.amazon.com/cloudwatch/home#logs) and look for your skill. If you do not see it then check that you are in the correct region. Remember that the Service Simulator is just that, a simulator. To see the fine details of any JSON messages send them to the logs and examine the contents.

6.  **Configure a test event in AWS Lambda.** Now that you are familiar with the **request** and **response** boxes in the Service Simulator you can use your **requests** to directly test your Lambda function every time you update it.  To do this:
    1.  Enter an utterance in the service simulator

    2.  Copy the generated Lambda Request for the next step.

    3.  Open your **Lambda function** in AWS, open the **Actions** menu, and select **Configure test events**.

        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-5-2-configure-test-event._TTH_.png" />

    4.  Select **Create New Test Event**. Choose **Alexa Start Session** as the Event Template from the dropdown list. You can choose any test event in the list, as they are just templated event requests, but using "Alexa Start Session" is an easy one to remember.  

        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-5-3-alexa-start-session._TTH_.png" />

    5.  Type in an **Event Name** into the Event Name Dialog box. Delete the contents of the code editor, and paste the **Lambda request** you copied above into the code editor. The Event Name is only visible to you. Name your test event something descriptive and memorable. For our example, we entered an event name as **startSession**. Additionally, by copying and pasting your Lambda Request from the service simulator, you can test different utterances and skill events beyond the pre-populated templates in Lambda.

        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/4-5-4-paste-request._TTH_.png" />

    6.  Click the **Create** button. This will save your test event and bring you back to the main configuration for your Lambda function.

    7.  Click the **Test** button to execute the **startSession** test event.

        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-5-5-save-and-test._TTH_.png" />

        This gives you visibility into four things:
        *  Your response, listed in the **Execution Result**.
           <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/4-5-5-1-execution-result._TTH_.png" />
        *  A summary of **statistics**. This includes things like duration, resources, and memory used.
           <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-5-5-2-summary._TTH_.png" />
        *  **Log output.**  You can track what is happening inside your function by using console.log() statements. This can help to figure out what is happening when something goes wrong.  The log is incredibly valuable as you move into more advanced skills.
           <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-5-5-3-log-output._TTH_.png"/>
        *  A link to your **[CloudWatch](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logs:) logs** for this function.  This will show you **all** of the responses and log statements from every user interaction.  This is very useful, especially when you are testing your skill from a device with your voice.  (It is the "[Click here](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logs:)" link in the Log Output description.)

7.  Other testing methods to consider:
    *  [Echosim.io](https://echosim.io) - a browser-based Alexa skill testing tool that makes it easy to test your skills without carrying a physical device everywhere you go.
    *  [Unit Testing with Alexa](https://github.com/alexa/alexa-cookbook/tree/master/testing/postman/README.md) - a modern approach to unit testing your Alexa skills with [Postman](http://getpostman.com) and [Amazon API Gateway](http://aws.amazon.com/apigateway).

8.  If your sample skill is working properly, you can now **customize it**.

<br/><br/>
<a href="./5-customization.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_customization._TTH_.png" /></a>

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>
