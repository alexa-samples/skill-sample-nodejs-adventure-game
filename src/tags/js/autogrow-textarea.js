(function(tagger) {
  if (typeof define === 'function' && define.amd) {
    define(['riot'], function(riot) { tagger(riot); });
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    tagger(require('riot'));
  } else {
    tagger(window.riot);
  }
})(function(riot) {
riot.tag2('autogrow-textarea', '<textarea name="$textarea" value="{opts.value || \'\'}" onblur="{opts.onblur}" onfocus="{opts.onfocus}" onclick="{opts.onclick}" onkeyup="{onKeyUp}" onkeydown="{opts.onkeydown}" onmouseup="{opts.onmouseup}" onmousedown="{opts.onmousedown}" onmouseenter="{opts.onmouseenter}" onmouseleave="{opts.onmouseleave}" onkeypress="{onKeyPress}"></textarea>', '', '', function(opts) {
var _this = this;

this.on('mount', function (x) {
  _this.root.value = _this.$textarea.value;
});

this.on('unmount', function (x) {
  _this.$textarea.value = '';
});

this.on('updated', function (x) {
  _this.root.value = _this.$textarea.value;
  resize.bind(_this)(_this.$textarea);
});

this.onKeyPress = function (e) {
  e.preventUpdate = true;
  resize.bind(_this)(_this.$textarea);
  if (typeof opts.onkeypress === 'function') {
    opts.onkeypress(e);
  }
  return true;
};

this.onKeyUp = function (e) {
  e.preventUpdate = true;
  resize.bind(_this)(_this.$textarea);
  _this.root.value = _this.$textarea.value;
  if (typeof opts.onkeyup === 'function') {
    opts.onkeyup(e);
  }
  return true;
};

function resize(el) {
  if (!el) return;

  this.root.style.height = el.style.height;

  el.style.height = '1em';
  el.style.height = el.scrollHeight + 'px';

  this.root.style.height = el.style.height;
}
});


});