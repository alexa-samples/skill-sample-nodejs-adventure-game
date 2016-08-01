(function(tagger) {
  if (typeof define === 'function' && define.amd) {
    define(['riot'], function(riot) { tagger(riot); });
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    tagger(require('riot'));
  } else {
    tagger(window.riot);
  }
})(function(riot) {
riot.tag2('panel', '<app-nav></app-nav> <panel-home if="{menu === \'home\'}" config="{opts.config}"></panel-home> <panel-edit-option if="{menu === \'option\'}" scenes="{opts.scenes}"></panel-edit-option> <panel-edit-scene if="{menu === \'scene\'}" config="{opts.config}" scenes="{opts.scenes}"></panel-edit-scene> </form>', '', '', function(opts) {
var _this = this;

this.menu = null;

var subRoute = riot.route.create();

subRoute('/', function (x) {
  _this.menu = 'home';
  _this.update();
});

subRoute('/response:*/*', function (utterance) {
  _this.menu = 'scene';
  _this.update();
});

subRoute('/scene:START/*', function (sceneId, utterance, tab) {
  _this.menu = 'scene';
  _this.update();
});

subRoute('/scene:*/option:*', function (x) {
  _this.menu = 'option';
  _this.update();
});

subRoute('/scene:*/*', function (sceneId, tab) {
  _this.menu = 'scene';
  _this.update();
});
});


});