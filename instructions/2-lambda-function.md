# Build An Alexa Gamebook Skill
[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png)](./1-voice-user-interface.md)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-on._TTH_.png)](./2-lambda-function.md)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-off._TTH_.png)](./3-connect-vui-to-code.md)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-off._TTH_.png)](./4-testing.md)[![Customization](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-off._TTH_.png)](./5-customization.md)[![Publication](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png)](./6-publication.md)

## Setting Up A Lambda Function Using Amazon Web Services

In the [first step of this guide](./1-voice-user-interface.md), we built the Voice User Interface (VUI) for our Alexa Skill.  On this page, we will be creating an AWS Lambda function.  You can read more about [what a Lambda function is](http://aws.amazon.com/lambda), but for the purposes of this guide, what you need to know is that AWS Lambda is where our code lives.  When a user asks Alexa to use our Skill, it is our AWS Lambda function that interprets the appropriate interaction, and provides the conversation back to the user.

1.  Go to **http://aws.amazon.com** and sign in to the console. [If you do not have an AWS account, check out this quick walkthrough for creating one](https://github.com/alexa/alexa-cookbook/tree/master/aws/set-up-aws.md).

    <a href="https://console.aws.amazon.com/console/home" target="_new"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-1-sign-in-to-the-console._TTH_.png" /></a>

2.  Click **Services** at the top of the screen and type **Lambda** in the search box.  Lambda can also be found in the list of services in the **Compute** section.

    <a href="https://console.aws.amazon.com/lambda/home" target="_new"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-2-services-lambda._TTH_.png" /></a>

3.  Check your **AWS region**. AWS Lambda only works with the Alexa Skills Kit in two regions: **US East (N. Virginia)** and **EU (Ireland)**.  Choose the region closest to your customers.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-3-check-region._TTH_.png"/>

4.  Click the **Create function** button. It should be near the top of your screen.  (If you don't see this button, it is because you haven't created a Lambda function before.  Click the blue **Get Started** button near the center of your screen.)

    <a href="#"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-4-create-a-lambda-function._TTH_.png" /></a>

5.  There are two boxes labeled "Author from scratch" and "Blueprints". Leave the radio button in the box titled **Author from scratch**.

6.  **Configure your function.** These values will only ever be visible to you, but name your function something meaningful.  If you don't have another idea for a name then **"gamebook"** is okay.

7.  Set up your Lambda function's **Role**. These are the AWS Identity and Access Management (IAM) permissions that allow the function to access other parts of AWS.
  * Select **Create new role from template(s)**.
  * Give it a suitable name, such as **lambda_alexa_execution**.
  * Choose a **Policy template** of **Simple Microservice permissions**.
  * For more information there is a [detailed walkthrough for setting up your first role for Lambda](https://github.com/alexa/alexa-cookbook/tree/master/aws/lambda-role.md).

    <img src="2-7-configure-your-function._TTH_.png" />

8. Click **Create Function** in the bottom right corner.  Scroll down to find it.

    <a href="#"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-11-create-function-button._TTH_.png" /></a>

9. After you create the function, the **ARN value** appears in the top right corner. An ARN, or [Amazon Resource Name](http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html), is used to uniquely identify an AWS resource. We will use this value later when we tell Alexa where to find our backend code.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/2-12-copy-ARN._TTH_.png" />

10. Configure your trigger. In the **Add triggers** column on the left select **Alexa Skills Kit**.  If you do not see Alexa Skills Kit in the list, jump back to step 3 on this page.

    <img src="2-6-configure-your-trigger._TTH_.png" />

    **Scroll down** and click the **Add** button (it is easy to miss this button as it is off the bottom of the screen). Then click the **Save** button in the top right. You should see a green success message at the top of your screen.

    Click the box with the **Lambda icon followed by the name of your function** (gamebook if you used our suggestion) and scroll down to the field called **Function code**.

8.  Our gamebook skill reads in data from Twine's html export. The data is in XML format and we have converted it to JSON with the node library xml2js. All libraries and dependencies must be uploaded for our Lambda code to access.
  * Under **code entry type** select **Upload a .ZIP file**.
  * **Upload** the zip file **lambda/custom/gamebook.zip**.
  * Click **Save**.
  * Under **code entry type** select **Edit code inline**. You should see our code.

9.  Alexa expects a response from backend processing within 8 seconds, so after receiving and sending the messages we will be left with around 7 seconds. Remember to keep response times short-and-snappy when designing Skills. If your skill becomes popular you may need to think about how to access data from very large database tables, cope with timeouts when calling external services, cache data, and many other things. Lambda itself is architected to scale well. Scroll down and in the **Basic Settings** increase the timeout to **7** seconds.

10.  Lambda needs to be provided with all the code and libraries that might be called. We uploaded a zip file with the node_modules that our skill uses (alexa-sdk and xml2js). If you want to create a very simple Alexa Skill, you could use **blueprints** and the **alexa-skill-kit-sdk-factskill**. This creates a Lambda function with the alexa-sdk preloaded.
If you create your own zip file package then be careful to have everything in the root of the zip and not the custom folder.

11.  Tell Lambda what your Alexa Skill's app id is. The JSON messages arriving from Alexa will include the app id. Alexa-sdk will check that the messages are not coming from another source i.e. someone is spoofing your app.

    Under **Environment Variables** create a new one called **APP_ID**. In a new browser tab go back to the Alexa App you created earlier in [developer.amazon.com](https://developer.amazon.com/edw/home.html#/skills).

    Click on **View Skill Id** below your app name and select the skill id similar to "amzn1.ask.skill.*d769cd05-db64-464b-bb53-ef4177edb7e2*"

    Paste this in as your **APP_ID** environment variable. Careful not to include a leading or trailing space. Click **Save**.

    Inside our code we can access this value as **process.env.APP_ID**.

15. Send a test message to the new function.

    Near the top-right of the screen, by the Test and Save buttons, select **Configure test events** in the dropdown.

    We are creating a **new test event**, so select **Alexa Start Session** and give it a name like **AlexaStart*.

    Update the 2 occurances of the app id with your actual app id retrieved for the environment variable in the previous step.

    something like changing:
    ```json
    "applicationId": "amzn1.ask.skill.[unique-value-here]"
    ```
    to
    ```json
    "applicationId": "amzn1.ask.skill.3e6f9e91-987c-48b5-123d-45fbe191fdf3"
    ```

    Press the **Test** button. This is testing the Lambda function standalone and will tell us straight away whether things are working or not.

    <br/><br/>
    <a href="./3-connect-vui-to-code.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_connect_vui_to_code._TTH_.png"/></a>

    <img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>
