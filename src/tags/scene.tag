<scene id="scene-{ opts.scene.id }" class={ 'is-selected': isSelected }>

  <div class="cell { opts.scene.color }{ opts.scene.isHidden ? ' is-hidden' : '' }">

    <button type="button"
            onclick={ onClickDestroyOption }
            if={ opts.option !== 'START' }
            class="btn btn-circle btn-remove">
    </button>

    <div class="option"
         onclick={ onClickEditOption }>
      { opts.option }
    </div>

    <div class="title"
         onclick={ onClickEditScene }>
      { opts.scene.card.title }
    </div>

    <button type="button"
            onclick={ onClickAddOption }
            class="btn btn-circle btn-add">
    </button>

  </div>

  <div class="row"
       if={ children.length }>
    <scene each={ children }
           scene={ scene }
           scenes={ scenes }
           option={ option } ></scene>
  </div>

  <script type="es6">

    this.children = []
    this.isSelected = false

    this.on('update', x => {
      if ( ! opts.scene ) return

      this.isSelected = false
      this.children = opts.scene.options.map( option => {
        return {
          scene: opts.scenes.find( scene => scene.id === option.sceneId ),
          option: option.utterances[0],
          scenes: opts.scenes
        }
      })

      var currentSceneId
      var hash = location.hash.split('/')

      try {
        if ( hash[ 1 ] && hash[ 1 ].indexOf('scene') === 0 ) {
          if ( hash[ 2 ] && hash[ 2 ].indexOf('option') === 0 ) {
            var parentScene = opts.scenes.find( scene => scene.id === Number( hash[ 1 ].split(':').pop() ) )
            var option = parentScene.options[ Number( hash[ 2 ].split(':').pop() ) ]
            currentSceneId = option ? option.sceneId : null
          }
          else {
            currentSceneId = Number( hash[ 1 ].split(':').pop() )
          }
        }
      }
      catch ( error ) { console.log( error ) }

      if ( opts.scene.id === currentSceneId ) {
        this.isSelected = true
      }

    })

    this.onClickDestroyOption = e => {
      e.stopPropagation()
      removeScene( e.item.scene )
      var options = this.parent.opts.scene.options
      var index = options.findIndex( option => option.sceneId === e.item.scene.id )
      options.splice( index, 1 )
      riot.route('/')
    }

    this.onClickEditOption = e => {
      e.stopPropagation()
      if ( ! this.scene && opts.scene ) {
        riot.route('/scene:START/card')
      }
      else {
        var index = this.parent.children.indexOf( e.item )
        riot.route('/scene:' + this.parent.opts.scene.id + '/option:' + index )
      }
    }

    this.onClickEditScene = e => {
      e.stopPropagation()
      riot.route('/scene:' + opts.scene.id + '/card')
    }

    this.onClickAddOption = e => {
      e.stopPropagation()
      var parentSceneId = opts.scene ? opts.scene.id : 0
      var sceneId = 0; while ( opts.scenes.find( scene => scene.id === sceneId ) ) { sceneId++ }
      var parentScene = opts.scenes.find( scene => scene.id === Number( parentSceneId ) )

      var option = {
        sceneId,
        utterances: [
          'open door'
        ]
      }

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
      }

      parentScene.options.push( option )
      opts.scenes.push( scene )

      riot.route('/scene:' + parentScene.id + '/option:' + ( parentScene.options.length -1 ) )
    }

    function removeScene ( scene ) {
      if ( ! scene ) return // exit

      var sceneId = scene.id
      var index = opts.scenes.findIndex( scene => scene.id === sceneId )
      if ( index > -1 ) {
        opts.scenes.splice( index, 1 )
      }

      // remove option scenes
      scene.options.forEach( option => {
        scene = opts.scenes.find( scene => scene.id === option.sceneId )
        removeScene( scene )
      })
    }

  </script>
</scene>
