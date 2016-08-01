<panel-edit-option>

  <h2>
    <strong>{ title }</strong>
    <span if={ title && subtitle }>-</span>
    <em>{ subtitle }</em>
  </h2>

  <div>
    <div class="input-row">
      <label for="$inputCommands">
        Command Utterances
      </label>
      <autogrow-textarea
        id="$inputCommands"
        onblur={ save }
        value={ option.utterances.join('\n') || '' }></autogrow-textarea>
    </div>
  </div>
<!--
  <collapsible title="Advanced"
               id="$collapsibleOptionAdvanced">
    <div class="input-row">
      <label for="$inputSceneId">
        Scene ID
      </label>
      <input type="text"
        id="$inputSceneId"
        onblur={ parent.save }
        value={ parent.option.sceneId }/>
    </div>
  </collapsible>
 -->

   <br>

   <a class="hotspot float-right"
      onmouseenter={ toggleNotice }
      onmouseleave={ toggleNotice }
      data-target="#optionNotice">
     <i class="fa fa-info fa-lg"></i>
   </a>
   <div id="optionNotice" class="notice display-none">
     <p>
       <strong>Command Utterances</strong>:<br>
       Each command supports multiple utterances. Each utterance must be separated by a new line.
     </p>
   </div>

  <script type="es6">

    this.title = null
    this.subtitle = null
    this.utterances = []
    this.option = null

    this.mixin('toggleNotice')

    var subRoute = riot.route.create()

    subRoute('/scene:*/option:*', ( parentSceneId, optionIndex ) => {
      var parentScene = opts.scenes.find( scene => scene.id === Number( parentSceneId ) )
      // incase someone input an incorrect URL
      if ( ! parentScene ) return riot.route('/') // exit
      this.option = parentScene.options[ Number( optionIndex ) ]
      // incase someone input an incorrect URL
      if ( ! this.option ) return riot.route('/') // exit
      // set title
      this.title = 'Scene ' + parentSceneId
      this.subtitle = this.option.utterances[0]
      this.update()
    })

    this.save = e => {
      // var $optionAdvanced = this.$collapsibleOptionAdvanced._tag
      this.option.utterances = this.$inputCommands.value.trim().split('\n')
      riot.update()
    }

  </script>

</panel-edit-option>
