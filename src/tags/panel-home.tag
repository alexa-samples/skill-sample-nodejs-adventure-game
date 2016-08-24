<panel-home>

  <h2>
    Home
  </h2>

  <!--<div>
    <div class="input-row">
      <label for="$inputSkillName">
        Alexa Skill Name
        <small>(Optional)</small>
      </label>
      <input type="text"
             id="$inputSkillName"
             data-setting="skillName"
             onblur={ updateGlobalSetting }
             value={ opts.config.skillName }>
    </div>
  </div>-->

  <collapsible title="Global Commands Utterances">
    <div class="input-row"
         each={ parent.commands }>
      <label>{ title }</label>
      <autogrow-textarea
        id="$command-{ parent.command }"
        onblur={ parent.parent.saveCommand }
        value={ utterances.slice().join('\n') }></autogrow-textarea>
    </div>
    <br>
    <a class="hotspot float-right"
       onmouseenter={ parent.toggleNotice }
       onmouseleave={ parent.toggleNotice }
       data-target="#globalCommandNotice">
      <i class="fa fa-info fa-lg"></i>
    </a>
    <div id="globalCommandNotice" class="notice display-none">
      <p>
        <strong>Global Command Utterances</strong>:<br>
        These commands are accessible globally within your Alexa Skill. They can be invoked at anytime during the context of your skill.
      </p>
      <p>
        Each command supports multiple utterances. Each utterance must be separated by a new line.
      </p>
    </div>
  </collapsible>

  <collapsible title="Global Command Responses">
    <ul class="list-unstyled">
      <li each={ parent.responses }>
        <a href="#/response:{ key }/card">{ title }</a>
      </li>
    </ul>
    <br>
    <a class="hotspot float-right"
       onmouseenter={ parent.toggleNotice }
       onmouseleave={ parent.toggleNotice }
       data-target="#globalResponseNotice">
      <i class="fa fa-info fa-lg"></i>
    </a>
    <div id="globalResponseNotice" class="notice display-none">
      <p>
        <strong>Global Command Responses</strong>:<br>
        Configure the responses for the various <em>global commands</em>.
      </p>
    </div>
  </collapsible>

  <collapsible title="AWS Settings" id="$collapsibleGlobalSettings">
    <div class="input-row">
      <label for="$inputLambdaName">
        AWS Lambda Function Name
      </label>
      <input type="text"
             id="$inputLambdaName"
             data-setting="lambdaName"
             onblur={ parent.updateGlobalSetting }
             value={ parent.opts.config.lambdaName }>
    </div>
    <div class="input-row">
      <label for="$inputDynamoTableName">
        Dynamo DB Table Name
        <small>(Optional)</small>
      </label>
      <input type="text"
             id="$inputDynamoTableName"
             data-setting="dynamoTableName"
             onblur={ parent.updateGlobalSetting }
             value={ parent.opts.config.dynamoTableName }>
    </div>
    <div class="input-row">
      <label for="$inputawsProfileName">
        AWS Profile
        <small>(Optional)</small>
      </label>
      <input type="text"
             id="$inputawsProfileName"
             data-setting="awsProfileName"
             onblur={ parent.updateGlobalSetting }
             value={ parent.opts.config.awsProfileName }>
    </div>
    <br>
    <a class="hotspot float-right"
       onmouseenter={ parent.toggleNotice }
       onmouseleave={ parent.toggleNotice }
       data-target="#globalAwsNotice">
      <i class="fa fa-info fa-lg"></i>
    </a>
    <div id="globalAwsNotice" class="notice display-none">
      <p>
        <strong>Dynamo DB Table Name</strong>
        <br>
        If a Dynamo DB Table Name is not provided, user state will not be persisted for future invocation.
      </p>
      <p>
        <strong>AWS Profile</strong>
        <br>
        AWS credentials should be stored @ <code>~/.aws/credentials.</code><br>
        See <a href="http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Setting_AWS_Credentials" target="_blank">Setting AWS Credentials</a> for more details.
      </p>
    </div>
  </collapsible>

  <script type="es6">

    this.commands = []
    this.responses = []

    this.mixin('toggleNotice')

    function camelCaseToWords ( str ){
      return str.match(/^[a-z]+|[A-Z][a-z]*/g).map(function(x){
        return x[0].toUpperCase() + x.substr(1).toLowerCase();
      }).join(' ');
    };

    this.on('mount', x => {
      this.responses = Object.keys( opts.config.responses ).map( key => {
        return {
          key: key,
          title: key.charAt(0).toUpperCase() + key.substr(1)
        }
      })
      this.commands = Object.keys( opts.config.commands ).map( function ( command ) {
        return {
          command: command,
          utterances: opts.config.commands[ command ],
          title: camelCaseToWords( command.replace('AMAZON.','').replace('Intent','') )
        }
      })
    })

    this.updateGlobalSetting = e => {
      var name = e.currentTarget.dataset.setting
      this[ name ] = opts.config[ name ] = e.currentTarget.value.trim()
    }

    this.saveCommand = e => {
      var value = e.target.value
      opts.config.commands[ e.item.command ] = value.trim().split('\n').filter( x => x !== '' )
    }

  </script>

</panel-home>
