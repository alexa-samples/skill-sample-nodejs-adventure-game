(function(tagger) {
  if (typeof define === 'function' && define.amd) {
    define(['riot'], function(riot) { tagger(riot); });
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    tagger(require('riot'));
  } else {
    tagger(window.riot);
  }
})(function(riot) {
riot.tag2('app-nav', '<button type="button" title="Home" onclick="{home}"> <i class="fa fa-home fa-lg"></i> </button> <h1> <img src="logo-alexa.jpg" alt="Alexa Skill Editor" height="25px"> </h1> <div> <button type="button" title="Save" onclick="{saveConfig}"> <i class="fa fa-save fa-lg"></i> </button> <button type="button" title="Upload" onclick="{uploadConfig}"> <i class="fa fa-cloud-upload fa-lg"></i> </button> <button type="button" title="Help" onclick="{help}"> <i class="fa fa-info fa-lg"></i> </button> </div>', '', '', function(opts) {

this.home = function (e) {
  riot.route('/');
};

this.help = function (e) {
  riot.route('/help');
};

this.saveConfig = function (e) {
  riot.route('/save');
};

this.uploadConfig = function (e) {
  riot.route('/upload');
};
});


});