<help if={ isVisible }
      onclick={ close }>

  <help-modal onclick={ stopPropagation }>
    <help-modal-title>
      Help
      <button type="button"
              name="close"
              onclick={ close }>
        &times;
      </button>
    </help-modal-title>
    <help-modal-content>

      <collapsible title="Global Command Utterances">
        <p>Define the utterances that trigger the available global commands such as &quot;<em>go back</em>&quot;, or &quot;<em>repeat options</em>&quot;. Each command supports multiple utterances and each utterance must be separated by a new line.</p>
      </collapsible>

      <collapsible title="Global Responses">
        <p>Here are links to configure Alexa’s responses to <strong>global commands</strong> such as:</p>
        <ul>
          <li>
            <p><strong>Ask to Resore State</strong>: This is Alexa’s response upon invoking the skill if a previous state is has been found within the Dynamo DB Table (defined in the AWS Settins section below.)</p>
          </li>
          <li>
            <p><strong>Unrecognized</strong>: This is Alexa’s response when a command has not been matched to the options available.</p>
          </li>
          <li>
            <p><strong>Help</strong>: This is Alexa’s response when the user asks for help.</p>
          </li>
          <li>
            <p><strong>Exit</strong>: This is Alexa’s response when the user asks to exit or cancel the skill.</p>
          </li>
        </ul>
      </collapsible>

      <collapsible title="AWS Settings">
        <p>These options help configure various the AWS technologies leveraged by the skill. The only required parameter is the <strong>AWS Lambda Function Name</strong>, otherwise you will not be able to upload your changes to the AWS Lambda platform.</p>
        <ul>
          <li>
            <p><strong>AWS Lambda Function Name</strong>: This must match the name you provided when creating your lambda function through the AWS administration interface.</p>
          </li>
          <li>
            <p><strong>Dynamo DB Table Name</strong>: <em>(This field is optional)</em> This value is used to identify the Dynamo DB table to which the current session state should be persisted to. If a Dynamo DB Table Name is not provided, user state will not be persisted and previous states can not be resumed upon future invocation. The Table identified must be accessible by the same AWS account identified below.</p>
          </li>
          <li>
            <p><strong>AWS Profile</strong>: <em>(This field is optional)</em> In order to upload your code to the AWS Lambda function hosted in the cloud you must use the credentials associated with your AWS account with the required IAM role permissions. AWS credentials should be stored @ ~/.aws/credentials. See <a href="http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Setting_AWS_Credentials">Setting AWS Credentials</a> for more details.</p>
          </li>
        </ul>
      </collapsible>

      <collapsible title="Keyboard Shortcuts">
        <dl>
          <div>
            <dt>Save</dt>
            <dd>
              <kbd>⌘</kbd> + <kbd>S</kbd>
            </dd>
          </div>
          <div>
            <dt>Upload</dt>
            <dd>
              <kbd>⌘</kbd> + <kbd>U</kbd>
            </dd>
          </div>
          <div>
            <dt>Help</dt>
            <dd>
              <kbd>⌘</kbd> + <kbd>H</kbd>
            </dd>
          </div>
        </dl>
      </collapsible>

    </help-modal-content>
  </help-modal>

  <script type="es6">

    this.isVisible = false

    var subRoute = riot.route.create()

    subRoute('/help', x => {
      this.isVisible = true
      this.update()
    })

    subRoute('/..', x => {
      this.isVisible = false
      this.update()
    })

    this.stopPropagation = e => {
      e.stopPropagation()
    }

    this.close = e => {
      e.stopPropagation()
      history.back()
    }

  </script>
</help>
