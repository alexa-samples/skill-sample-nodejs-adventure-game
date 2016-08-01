(function(tagger) {
  if (typeof define === 'function' && define.amd) {
    define(['riot'], function(riot) { tagger(riot); });
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    tagger(require('riot'));
  } else {
    tagger(window.riot);
  }
})(function(riot) {
riot.tag2('scene', '<div class="cell {opts.scene.color}{opts.scene.isHidden ? \' is-hidden\' : \'\'}"> <button type="button" onclick="{onClickDestroyOption}" if="{opts.option !== \'START\'}" class="btn btn-circle btn-remove"> </button> <div class="option" onclick="{onClickEditOption}"> {opts.option} </div> <div class="title" onclick="{onClickEditScene}"> {opts.scene.card.title} </div> <button type="button" onclick="{onClickAddOption}" class="btn btn-circle btn-add"> </button> </div> <div class="row" if="{children.length}"> <scene each="{children}" scene="{scene}" scenes="{scenes}" option="{option}"></scene> </div>', '', 'id="scene-{opts.scene.id}" class="{\'is-selected\': isSelected}"', function(opts) {
var _this = this;

this.children = [];
this.isSelected = false;

this.on('update', function (x) {
  if (!opts.scene) return;

  _this.isSelected = false;
  _this.children = opts.scene.options.map(function (option) {
    return {
      scene: opts.scenes.find(function (scene) {
        return scene.id === option.sceneId;
      }),
      option: option.utterances[0],
      scenes: opts.scenes
    };
  });

  var currentSceneId;
  var hash = location.hash.split('/');

  try {
    if (hash[1] && hash[1].indexOf('scene') === 0) {
      if (hash[2] && hash[2].indexOf('option') === 0) {
        var parentScene = opts.scenes.find(function (scene) {
          return scene.id === Number(hash[1].split(':').pop());
        });
        var option = parentScene.options[Number(hash[2].split(':').pop())];
        currentSceneId = option ? option.sceneId : null;
      } else {
        currentSceneId = Number(hash[1].split(':').pop());
      }
    }
  } catch (error) {
    console.log(error);
  }

  if (opts.scene.id === currentSceneId) {
    _this.isSelected = true;
  }
});

this.onClickDestroyOption = function (e) {
  e.stopPropagation();
  removeScene(e.item.scene);
  var options = _this.parent.opts.scene.options;
  var index = options.findIndex(function (option) {
    return option.sceneId === e.item.scene.id;
  });
  options.splice(index, 1);
  riot.route('/');
};

this.onClickEditOption = function (e) {
  e.stopPropagation();
  if (!_this.scene && opts.scene) {
    riot.route('/scene:START/card');
  } else {
    var index = _this.parent.children.indexOf(e.item);
    riot.route('/scene:' + _this.parent.opts.scene.id + '/option:' + index);
  }
};

this.onClickEditScene = function (e) {
  e.stopPropagation();
  riot.route('/scene:' + opts.scene.id + '/card');
};

this.onClickAddOption = function (e) {
  e.stopPropagation();
  var parentSceneId = opts.scene ? opts.scene.id : 0;
  var sceneId = 0;while (opts.scenes.find(function (scene) {
    return scene.id === sceneId;
  })) {
    sceneId++;
  }
  var parentScene = opts.scenes.find(function (scene) {
    return scene.id === Number(parentSceneId);
  });

  var option = {
    sceneId: sceneId,
    utterances: ['open door']
  };

  var scene = {
    id: sceneId,
    color: 'default',
    isHidden: false,
    generateOptions: true,
    readPreviousOptions: false,
    card: {
      title: 'Room',
      text: 'You enter a room.',
      image: {
        smallImageUrl: null,
        largeImageUrl: null
      }
    },
    voice: {
      intro: 'You enter a room. What would you like to do?',
      prompt: ''
    },
    options: []
  };

  parentScene.options.push(option);
  opts.scenes.push(scene);

  riot.route('/scene:' + parentScene.id + '/option:' + (parentScene.options.length - 1));
};

function removeScene(scene) {
  if (!scene) return;

  var sceneId = scene.id;
  var index = opts.scenes.findIndex(function (scene) {
    return scene.id === sceneId;
  });
  if (index > -1) {
    opts.scenes.splice(index, 1);
  }

  scene.options.forEach(function (option) {
    scene = opts.scenes.find(function (scene) {
      return scene.id === option.sceneId;
    });
    removeScene(scene);
  });
}
});


});