(function(tagger) {
  if (typeof define === 'function' && define.amd) {
    define(['riot'], function(riot) { tagger(riot); });
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    tagger(require('riot'));
  } else {
    tagger(window.riot);
  }
})(function(riot) {
riot.tag2('panel-edit-scene', '<h2> <strong>{title}</strong> <span if="{title && subtitle}">-</span> <em>{subtitle}</em> </h2> <collapsible title="Advanced" id="$collapsibleSceneAdvanced"> <div class="input-row"> <label for="$inputIsHidden"> Hidden Scene </label> <div class="radio-set"> <span class="radio-button"> <input type="radio" value="true" name="$inputIsHidden" id="$inputIsHiddenTrue" onchange="{parent.save}" __checked="{parent.scene.isHidden === true}"> <label for="$inputIsHiddenTrue"> Yes </label> </span> <span class="radio-button"> <input type="radio" value="false" name="$inputIsHidden" id="$inputIsHiddenFalse" onchange="{parent.save}" __checked="{parent.scene.isHidden === false}"> <label for="$inputIsHiddenFalse"> No </label> </span> </div> </div> <div class="input-row" if="{parent.scene.voice.prompt.trim() === \'\'}"> <label for="$inputReadPreviousOptions"> Prompt with Previous Scene\'s Options </label> <div class="radio-set"> <span class="radio-button"> <input type="radio" value="true" name="$inputReadPreviousOptions" id="$inputReadPreviousOptionsTrue" onchange="{parent.save}" __checked="{parent.scene.readPreviousOptions === true}"> <label for="$inputReadPreviousOptionsTrue"> Yes </label> </span> <span class="radio-button"> <input type="radio" value="false" name="$inputReadPreviousOptions" id="$inputReadPreviousOptionsFalse" onchange="{parent.save}" __checked="{parent.scene.readPreviousOptions === false}"> <label for="$inputReadPreviousOptionsFalse"> No </label> </span> </div> </div> <div class="input-row"> <label for="$inputColor"> Color </label> <div class="radio-set"> <span class="radio-button"> <input type="radio" value="default" name="$inputColor" id="$inputColorDefault" onchange="{parent.save}" __checked="{parent.scene.color === \'default\'}"> <label for="$inputColorDefault"> <span class="color-swatch default"></span> </label> </span> <span class="radio-button"> <input type="radio" value="green" name="$inputColor" id="$inputColorGreen" onchange="{parent.save}" __checked="{parent.scene.color === \'green\'}"> <label for="$inputColorGreen"> <span class="color-swatch green"></span> </label> </span> <span class="radio-button"> <input type="radio" value="red" name="$inputColor" id="$inputColorRed" onchange="{parent.save}" __checked="{parent.scene.color === \'red\'}"> <label for="$inputColorRed"> <span class="color-swatch red"></span> </label> </span> <span class="radio-button"> <input type="radio" value="yellow" name="$inputColor" id="$inputColorYellow" onchange="{parent.save}" __checked="{parent.scene.color === \'yellow\'}"> <label for="$inputColorYellow"> <span class="color-swatch yellow"></span> </label> </span> </div> </div> </collapsible> <div class="tabs"> <div class="tab"> <input type="radio" value="card" name="$inputTab" id="$inputTabCard" onchange="{onChangeTab}" __checked="{currentTab === \'card\'}"> <label for="$inputTabCard"> Card </label> </div> <div class="tab"> <input type="radio" value="voice" name="$inputTab" id="$inputTabVoice" onchange="{onChangeTab}" __checked="{currentTab === \'voice\'}"> <label for="$inputTabVoice"> Voice </label> </div> </div> <div class="tab-content" show="{currentTab === \'card\'}"> <div class="input-row"> <label for="$title"> Title </label> <autogrow-textarea id="$title" onblur="{save}" value="{scene.card.title}"></autogrow-textarea> </div> <div class="input-row"> <label for="$text"> Text </label> <autogrow-textarea id="$text" onblur="{save}" value="{scene.card.text}"></autogrow-textarea> </div> <div class="input-row"> <label for="$cardPrompt"> Override Default Prompt <small>(Optional)</small> </label> <autogrow-textarea id="$cardPrompt" onblur="{save}" value="{scene.card.prompt}"></autogrow-textarea> </div> <collapsible title="Image" id="$collapsibleCardImage"> <img if="{parent.scene.card.image.smallImageUrl}" riot-src="{parent.scene.card.image.smallImageUrl}" alt="Small Card Image"> <div class="input-row"> <label for="$inputSmallImageUrl"> Small Image URL <small>(108&times;108)</small> </label> <input type="url" id="$inputSmallImageUrl" onblur="{parent.save}" value="{parent.scene.card.image.smallImageUrl}"> </div> <img if="{parent.scene.card.image.largeImageUrl}" riot-src="{parent.scene.card.image.largeImageUrl}" alt="Large Card Image"> <div class="input-row"> <label for="$inputLargeImageUrl"> Large Image URL <small>(512&times;512)</small> </label> <input type="url" id="$inputLargeImageUrl" onblur="{parent.save}" value="{parent.scene.card.image.largeImageUrl}"> </div> <br> <a class="hotspot float-right" onmouseenter="{parent.toggleNotice}" onmouseleave="{parent.toggleNotice}" data-target="#imageNotice"> <i class="fa fa-info fa-lg"></i> </a> <div id="imageNotice" class="notice text-center display-none"> <p> <small> <strong>Note</strong>: All image URLs must be secure (HTTPS) </small> </p> </div> </collapsible> <br> <a class="hotspot float-right" onmouseenter="{toggleNotice}" onmouseleave="{toggleNotice}" data-target="#cardNotice"> <i class="fa fa-info fa-lg"></i> </a> <div id="cardNotice" class="notice display-none"> <p> <strong>Override Default Prompt</strong>:<br> By default, the Alexa will provide a visual "card" to prompt the user to respond by reading out the all current available options. </p> <p> If you would prefer to override this default behavior, enter your user prompt here. </p> <p> <small> <strong>Note:</strong> Options that lead to "hidden" scenes will be ignored. </small> </p> </div> </div> <div class="tab-content" show="{currentTab === \'voice\'}"> <div class="input-row"> <label for="$intro"> Speech </label> <autogrow-textarea id="$intro" onblur="{save}" value="{scene.voice.intro}"></autogrow-textarea> </div> <div class="input-row"> <label for="$voicePrompt"> Override Default Prompt <small>(Optional)</small> </label> <autogrow-textarea id="$voicePrompt" onblur="{save}" value="{scene.voice.prompt}"></autogrow-textarea> </div> <br> <a class="hotspot float-right" onmouseenter="{toggleNotice}" onmouseleave="{toggleNotice}" data-target="#ssmlNotice"> <i class="fa fa-info fa-lg"></i> </a> <div id="ssmlNotice" class="notice display-none"> <p> <strong>Override Default Prompt</strong>:<br> By default, Alexa will prompt the user to respond by reading out the all current available options. </p> <p> If you would prefer to override this default behavior, enter your user prompt here. </p> <p> <small> <strong>Note:</strong> Options that lead to "hidden" scenes will be ignored. </small> </p> <p> <strong>Supported SSML Tags</strong> </p> <br> <code class="row"> <ul class="list-unstyled"> <li>&lt;audio&gt;</li> <li>&lt;break&gt;</li> <li>&lt;speak&gt;</li> <li>&lt;say-as&gt;</li> </ul> <ul class="list-unstyled"> <li>&lt;phoneme&gt;</li> <li>&lt;s&gt;</li> <li>&lt;p&gt;</li> <li>&lt;w&gt;</li> </ul> </code> <p> See <a href="https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference" target="_blank">Alexa <code>SSML</code> documentation</a> <br> <small> <strong>Note</strong>: All URLs must be secure (HTTPS) </small> </p> </div> </div>', '', '', function(opts) {
var _this = this;

this.title = null;
this.scene = null;
this.currentTab = null;

this.mixin('toggleNotice');

var subRoute = riot.route.create();

subRoute('/', function (x) {
  _this.scene = null;
  _this.update();
});

subRoute('/response:*/*', function (utterance, tab) {
  _this.title = 'Response';
  _this.subtitle = utterance;
  _this.scene = opts.config.responses[utterance];
  _this.currentTab = tab === 'card' ? 'card' : 'voice';
  _this.update();
});

subRoute('/scene:START/*', function (tab) {
  _this.title = 'Start';
  _this.subtitle = 'Skill launch';
  _this.scene = opts.scenes[0];
  _this.currentTab = tab === 'card' ? 'card' : 'voice';
  _this.update();
});

subRoute('/scene:*/*', function (sceneId, tab) {
  _this.scene = opts.scenes.find(function (scene) {
    return scene.id === Number(sceneId);
  });

  if (!_this.scene) return riot.route('/');
  _this.title = 'Scene ' + _this.scene.id;
  _this.subtitle = _this.scene.card.title;
  _this.currentTab = tab === 'card' ? 'card' : 'voice';
  _this.update();
});

this.onChangeTab = function (e) {
  var hash = location.hash.split('/');
  hash = hash.slice(1, hash.length - 1);
  hash.push(e.target.value);
  riot.route(hash.join('/'));
};

this.save = function (e) {
  var $advanced = _this.$collapsibleSceneAdvanced._tag;
  var $colorSelection = [$advanced.$inputColorDefault, $advanced.$inputColorGreen, $advanced.$inputColorRed, $advanced.$inputColorYellow].find(function (x) {
    return x.checked;
  });

  _this.scene.color = $colorSelection ? $colorSelection.value : 'default';
  _this.scene.isHidden = $advanced.$inputIsHiddenTrue.checked;
  _this.scene.readPreviousOptions = $advanced.$inputReadPreviousOptionsTrue.checked;

  _this.scene.voice = {
    intro: _this.$intro.value.trim(),
    prompt: _this.$voicePrompt.value.trim()
  };

  var $cardImage = _this.$collapsibleCardImage._tag;
  _this.scene.card = {
    title: _this.$title.value.trim(),
    text: _this.$text.value.trim(),
    prompt: _this.$cardPrompt.value.trim(),
    image: {
      largeImageUrl: $cardImage.$inputLargeImageUrl.value.trim() || null,
      smallImageUrl: $cardImage.$inputSmallImageUrl.value.trim() || null
    }
  };

  _this.subtitle = _this.scene.card.title;

  riot.update();
};
});


});