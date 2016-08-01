(function(tagger) {
  if (typeof define === 'function' && define.amd) {
    define(['riot'], function(riot) { tagger(riot); });
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    tagger(require('riot'));
  } else {
    tagger(window.riot);
  }
})(function(riot) {
riot.tag2('home-menu', '<h2> Home </h2> <div class="input-row"> <label for="$inputSkillName"> Alexa Skill Name </label> <input type="text" id="$inputSkillName" data-setting="skillName" onblur="{updateGlobalSetting}" value="{opts.config.skillName}"> </div> <collapsible title="AWS Settings" id="$collapsibleGlobalSettings"> <div class="input-row"> <label for="$inputLambdaName"> AWS Lambda Function Name </label> <input type="text" id="$inputLambdaName" data-setting="lambdaName" onblur="{parent.updateGlobalSetting}" value="{parent.opts.config.lambdaName}"> </div> <div class="input-row"> <label for="$inputDynamoTableName"> Dynamo DB Table Name </label> <input type="text" id="$inputDynamoTableName" data-setting="dynamoTableName" onblur="{parent.updateGlobalSetting}" value="{parent.opts.config.dynamoTableName}"> </div> <div class="input-row"> <label for="$inputawsProfileName"> AWS Profile </label> <input type="text" id="$inputawsProfileName" data-setting="awsProfileName" onblur="{parent.updateGlobalSetting}" value="{parent.opts.config.awsProfileName}"> </div> <br> <a class="hotspot float-right" onmouseenter="{parent.toggleNotice}" onmouseleave="{parent.toggleNotice}" data-target="#awsNotice"> <i class="fa fa-question fa-lg"></i> </a> <div id="awsNotice" class="notice text-center display-none"> <p> <code>~/.aws/credentials.</code><br> See <a href="http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Setting_AWS_Credentials" target="_blank">Setting AWS Credentials</a> for more details. </p> </div> </collapsible> <collapsible title="Global Commands"> <div class="input-row" each="{parent.commands}"> <label>{title}</label> <autogrow-textarea id="$command-{parent.command}" onblur="{parent.parent.saveCommand}" value="{utterances.slice().join(\'\\n\')}"></autogrow-textarea> </div> </collapsible> <collapsible title="Global Responses"> <ul class="list-unstyled"> <li each="{parent.responses}"> <a href="#/response/{key}">{title}</a> </li> </ul> </collapsible>', '', '', function(opts) {
var _this = this;

this.responses = [];
this.commands = [];

function camelCaseToWords(str) {
  return str.match(/^[a-z]+|[A-Z][a-z]*/g).map(function (x) {
    return x[0].toUpperCase() + x.substr(1).toLowerCase();
  }).join(' ');
};

this.on('mount', function (x) {
  _this.responses = Object.keys(opts.config.responses).map(function (key) {
    return {
      key: key,
      title: key.charAt(0).toUpperCase() + key.substr(1)
    };
  });
  _this.commands = Object.keys(opts.config.commands).map(function (command) {
    return {
      command: command,
      utterances: opts.config.commands[command],
      title: camelCaseToWords(command.replace('AMAZON.', '').replace('Intent', ''))
    };
  });
});

this.updateGlobalSetting = function (e) {
  var name = e.currentTarget.dataset.setting;
  _this[name] = opts.config[name] = e.currentTarget.value.trim();
};

this.saveCommand = function (e) {
  var value = e.target.value;
  opts.config.commands[e.item.command] = value.trim().split('\n').filter(function (x) {
    return x !== '';
  });
};

this.toggleNotice = function (e) {
  var target = document.querySelector(e.currentTarget.dataset.target);
  if (!target) return;
  if (target.classList.contains('display-none')) {
    target.classList.remove('display-none');
  } else {
    target.classList.add('display-none');
  }
};
});


});