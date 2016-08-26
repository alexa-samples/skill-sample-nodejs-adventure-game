# Interactive Adventure Game Tool

This tool provides an easy to use front-end that allows developers to instantly deploy code for your story, or use the generated code as a starting point for more complex projects. It was written in Node.js by Thomas Yuill, a designer and engineer in the Amazon Advertising team.

![alt text](https://cloud.githubusercontent.com/assets/7671574/17309622/a574be7a-57f4-11e6-9ea8-a52f20424bc5.png "Interactive Adventure Game Tool Screenshot")

##  How to Get Started

Setup AWS and the Amazon Developer Console

To get started with the included sample project, you'll need to setup a few pre-requisites:

* The tool generates Node.js code that will be deployed to AWS Lambda to handle requests from users passed to you from the Alexa platform. 
* The skill uses a table in AWS DynamoDB to save the user's progress between sessions.  
* You can then register your skill with Alexa using the Amazon Developer website, linking it to your AWS resources.

Set these up with these step-by-step instructions:

1. Create or login to an AWS account. In the AWS Console:
  1. Switch to the "N. Virginia" region, since Alexa Skills are currently only supported in that region.
  
     ![switch_region](https://cloud.githubusercontent.com/assets/1970771/17977067/034c82c2-6aa5-11e6-96be-a87d9832e123.png "AWS Switch Region Screenshot") 
  
  1. Create an AWS Role in IAM with access to Lambda, CloudWatch Logs and DynamoDB.
  
     ![create_role_1](https://cloud.githubusercontent.com/assets/7671574/17451098/09f64f40-5b19-11e6-82ee-b82c98387052.png "AWS Create Role Screenshot 1")
     ![create_role_2](https://cloud.githubusercontent.com/assets/7671574/17451100/0c3ef928-5b19-11e6-9aca-8cd353106396.png "AWS Create Role Screenshot 2")
     ![create_role_3](https://cloud.githubusercontent.com/assets/7671574/18011103/7b05f2b2-6b68-11e6-8dc3-3aa9ead6d83e.png "AWS Create Role Screenshot 3")

  1. Create an AWS Lambda function named MyAlexaSkillLambdaFunction being sure to select "Alexa Skills Kit" as the trigger and using the role created above.  Take note of the ARN on the upper right, which you'll configure in the Developer Console later.
  
     ![alt text](https://cloud.githubusercontent.com/assets/7671574/17451088/ff126618-5b18-11e6-8f46-fbfb9461ab80.png "AWS Lambda Create Trigger Screenshot")

  1. Create an AWS DynamoDB table named MyAlexaSkillTable with the case sensitive primary key "userId".

     ![alt text](https://cloud.githubusercontent.com/assets/7671574/17307587/b80787f2-57ea-11e6-9be2-3df26e8e5947.png "AWS DynamoDB Screenshot")

1. Create or login to an [Amazon Developer account](https://developer.amazon.com).  In the Developer Console: 
  1. [Create an Alexa Skill](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-an-alexa-skill-as-a-lambda-function) named MySkill and using the invocation name "my skill" and using the ARN you noted above.

     ![alt text](https://cloud.githubusercontent.com/assets/7671574/17307653/13500166-57eb-11e6-844d-1083efa3dddb.png "Developer Portal Skill Information Screenshot")

     ![alt text](https://cloud.githubusercontent.com/assets/7671574/17307655/167433a8-57eb-11e6-9951-822ad2243f11.png "Developer Portal Configuration Screenshot")

## Set up Your Machine

Next, you'll setup your local environment to run the tool.  It's run using Node.js and you access it with a standard web browser.  On OS X:

1. Configure AWS credentials the tool will use to upload code to your Skill.  You do this by creating a file under a ".aws" directory in your home directory.

    ```
    mkdir ~/.aws/
    touch ~/.aws/credentials
    ```

2. The file should have the format, and include keys you retrieve from the AWS console:

    ```
    [default]
    aws_access_key_id = [KEY FROM AWS]
    aws_secret_access_key = [SECRET KEY FROM AWS]
    ```

2.	Setup NodeJS and NPM:

    ```
    brew install node
    ```

3.	Get the code and install dependencies:

    ```
    git clone  https://github.com/alexa/interactive-adventure-game-tool.git
    npm install
    ```

4.	Launch:

    ```
    npm start
    ```

## Using the Tool

Once the tool opens in a browser window, you'll see that a sample project is pre-loaded that shows off the main features of the tool.

On the left, you'll see a tree of nodes, which represents how users will navigate your skill.  Users start at the big blue "Start" node.

The smaller bubbles above each node represents the utterance, a phrase the user will say to reach that node, and Alexa will read these to the user when they reach the parent node unless you override this using "Override Default Prompt" or if the node is hidden (see below).

In the sample skill, an example interaction with Alexa might be:

```
User:  Alexa, launch My Alexa Skill.
Alexa:  Welcome to my Alexa Skill.  To learn how to use this skill, say "Help".  When you are ready, say "Begin".
User:  Begin
Alexa:  You enter a room with three doors, each with a distinct number on it. Which door would you like to open?
```

If you select a node, you can see the Voice and Card elements on the right that Alexa will send/say to the user upon reaching the node.

Under the "Advanced" options, you can change the color of the node to help you organize (colors don't change the behavior of your skill) and you can "hide" nodes, causing Alexa to skip reading their utterance as part of the default prompt of the parent.

If you click on an utterance, you can enter multiple variations of the phrase that will also be accepted by Alexa.  Only the first one will be read to the user in the default prompt.

Lastly, the icons on the upper right allow you to:

* ![alt text](https://cloud.githubusercontent.com/assets/7671574/17307920/48d152f8-57ec-11e6-9bdd-f24c9695ce49.png "Save Icon") Save the Skill code, which will be output to "./src/skill". 
* ![alt text](https://cloud.githubusercontent.com/assets/7671574/17307929/515c27ae-57ec-11e6-8347-3736778f1b41.png "Upload Icon")
 Upload the Skill code to the Lambda function you configured earlier.  You can configure the function name by clicking the home icon and changing the values under "AWS Settings".
* ![alt text](https://cloud.githubusercontent.com/assets/7671574/17307932/53fc7e50-57ec-11e6-8019-00fa8054e53e.png "Help Icon") See help content for the tool.

![alt text](https://cloud.githubusercontent.com/assets/7671574/17307977/8888955a-57ec-11e6-90aa-334bf4467119.png "Interactive Adventure Game Tool Main Panel Screenshot")

![alt text](https://cloud.githubusercontent.com/assets/7671574/17307979/8ba30248-57ec-11e6-89ed-ae05c2a934ff.png "Interactive Adventure Game Tool Voice Panel Screenshot")

## Finishing Deployment of Your Skill

Click the "Save" icon (if you haven't already), and the "Upload" icon to send the Skill code up to Lambda.  When you save the Skill, the tool generates some additional configuration inside "./src/skill/models/" that you'll use to tell Alexa how users will interact with you Skill.

You'll need to complete the configuration manually by logging into the [Developer Console](https://developer.amazon.com) and accessing the "My Alexa Skill" you created above.  On the "Interaction Model" tab, copy and paste the Intent Schema from "./src/skill/models/intentSchema.json" and Sample Utterances from "./src/skill/models/utterances.txt".

Click save, and the Skill should now be available on your developer account.  If your Alexa device is associated with the same Amazon account as your Developer Console account, then you can start using the skill immediately.  Or you can use it on the [online simulator](https://echosim.io) by logging in using the same account.

Congrats!  Enjoy and let your imagination run wild, we can't wait to see what you come up with!
