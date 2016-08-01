(function(tagger) {
  if (typeof define === 'function' && define.amd) {
    define(['riot'], function(riot) { tagger(riot); });
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    tagger(require('riot'));
  } else {
    tagger(window.riot);
  }
})(function(riot) {
riot.tag2('collapsible', '<collapsible-title id="$title"> <icon></icon> {opts.title} </collapsible-title> <collapsible-content> <yield></yield> </collapsible-content>', '', 'class="{\'is-open\': opts.isOpen}"', function(opts) {
var _this = this;

opts.isOpen = opts.isOpen || false;

this.$title.addEventListener('click', function (e) {
    opts.isOpen = !opts.isOpen;
    _this.update();
});
});


});