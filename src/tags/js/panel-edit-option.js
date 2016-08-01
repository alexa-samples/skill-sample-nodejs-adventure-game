(function(tagger) {
  if (typeof define === 'function' && define.amd) {
    define(['riot'], function(riot) { tagger(riot); });
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    tagger(require('riot'));
  } else {
    tagger(window.riot);
  }
})(function(riot) {
riot.tag2('panel-edit-option', '<h2> <strong>{title}</strong> <span if="{title && subtitle}">-</span> <em>{subtitle}</em> </h2> <div> <div class="input-row"> <label for="$inputCommands"> Command Utterances </label> <autogrow-textarea id="$inputCommands" onblur="{save}" value="{option.utterances.join(\'\\n\') || \'\'}"></autogrow-textarea> </div> </div> <br> <a class="hotspot float-right" onmouseenter="{toggleNotice}" onmouseleave="{toggleNotice}" data-target="#optionNotice"> <i class="fa fa-info fa-lg"></i> </a> <div id="optionNotice" class="notice display-none"> <p> <strong>Command Utterances</strong>:<br> Each command supports multiple utterances. Each utterance must be separated by a new line. </p> </div>', '', '', function(opts) {
var _this = this;

this.title = null;
this.subtitle = null;
this.utterances = [];
this.option = null;

this.mixin('toggleNotice');

var subRoute = riot.route.create();

subRoute('/scene:*/option:*', function (parentSceneId, optionIndex) {
  var parentScene = opts.scenes.find(function (scene) {
    return scene.id === Number(parentSceneId);
  });

  if (!parentScene) return riot.route('/');
  _this.option = parentScene.options[Number(optionIndex)];

  if (!_this.option) return riot.route('/');
  _this.title = 'Scene ' + parentSceneId;
  _this.subtitle = _this.option.utterances[0];
  _this.update();
});

this.save = function (e) {
  _this.option.utterances = _this.$inputCommands.value.trim().split('\n');
  riot.update();
};
});


});