(function(tagger) {
  if (typeof define === 'function' && define.amd) {
    define(['riot'], function(riot) { tagger(riot); });
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    tagger(require('riot'));
  } else {
    tagger(window.riot);
  }
})(function(riot) {
riot.tag2('map', '<div id="$mapContainer" class="map-container"> <scene id="$start" option="START" scenes="{scenes}" scene="{scenes[0]}"></scene> </div>', '', 'class="{reveal: reveal}"', function(opts) {
var _this = this;

this.reveal = false;
this.scrollTop = 0;
this.scrollLeft = 0;

this.scenes = opts.scenes;
this.responses = opts.config.responses;
this.skillName = opts.config.skillName;

var subRoute = riot.route.create();

subRoute(function (x) {
  _this.update();
});

this.on('mount', function (x) {
  resize.bind(_this)();
});

this.on('update', function (x) {
  _this.scrollTop = _this.root.scrollTop;
  _this.scrollLeft = _this.root.scrollLeft;
});

this.on('updated', function (x) {
  resize.bind(_this)();
  _this.root.scrollTop = _this.scrollTop;
  _this.root.scrollLeft = _this.scrollLeft;
});

window.addEventListener('resize', resize.bind(this));

function resize(e) {
  var width = this.$start.querySelector('.row > scene').clientWidth;
  this.$mapContainer.style.width = Math.max(width, this.$mapContainer.clientWidth) + 'px';
  this.root.scrollLeft = (width - this.root.clientWidth) / 2;
}
});


});