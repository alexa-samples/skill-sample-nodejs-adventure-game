<panel-edit-scene>

  <h2>
    <strong>{ title }</strong>
    <span if={ title && subtitle }>-</span>
    <em>{ subtitle }</em>
  </h2>

  <collapsible title="Advanced"
               id="$collapsibleSceneAdvanced">

    <!-- TODO: add UI for selecting alternate scene description if specific session.attributes.flags property is set to TRUE -->

    <div class="input-row">
      <label for="$inputIsHidden">
        Hidden Scene
      </label>
      <div class="radio-set">
        <span class="radio-button">
          <input type="radio"
                 value="true"
                 name="$inputIsHidden"
                 id="$inputIsHiddenTrue"
                 onchange={ parent.save }
                 checked={ parent.scene.isHidden === true }>
          <label for="$inputIsHiddenTrue">
            Yes
          </label>
        </span>
        <span class="radio-button">
          <input type="radio"
                 value="false"
                 name="$inputIsHidden"
                 id="$inputIsHiddenFalse"
                 onchange={ parent.save }
                 checked={ parent.scene.isHidden === false  }>
          <label for="$inputIsHiddenFalse">
            No
          </label>
        </span>
      </div>
    </div>

    <div class="input-row"
         if={ parent.scene.voice.prompt.trim() === '' }>
      <label for="$inputReadPreviousOptions">
        Prompt with Previous Scene's Options
      </label>
      <div class="radio-set">
        <span class="radio-button">
          <input type="radio"
                 value="true"
                 name="$inputReadPreviousOptions"
                 id="$inputReadPreviousOptionsTrue"
                 onchange={ parent.save }
                 checked={ parent.scene.readPreviousOptions === true }>
          <label for="$inputReadPreviousOptionsTrue">
            Yes
          </label>
        </span>
        <span class="radio-button">
          <input type="radio"
                 value="false"
                 name="$inputReadPreviousOptions"
                 id="$inputReadPreviousOptionsFalse"
                 onchange={ parent.save }
                 checked={ parent.scene.readPreviousOptions === false  }>
          <label for="$inputReadPreviousOptionsFalse">
            No
          </label>
        </span>
      </div>
    </div>

    <div class="input-row">
      <label for="$inputColor">
        Color
      </label>
      <div class="radio-set">
        <span class="radio-button">
          <input type="radio"
                 value="default"
                 name="$inputColor"
                 id="$inputColorDefault"
                 onchange={ parent.save }
                 checked={ parent.scene.color === 'default' }>
          <label for="$inputColorDefault">
            <span class="color-swatch default"></span>
          </label>
        </span>
        <span class="radio-button">
          <input type="radio"
                 value="green"
                 name="$inputColor"
                 id="$inputColorGreen"
                 onchange={ parent.save }
                 checked={ parent.scene.color === 'green' }>
          <label for="$inputColorGreen">
            <span class="color-swatch green"></span>
          </label>
        </span>
        <span class="radio-button">
          <input type="radio"
                 value="red"
                 name="$inputColor"
                 id="$inputColorRed"
                 onchange={ parent.save }
                 checked={ parent.scene.color === 'red' }>
          <label for="$inputColorRed">
            <span class="color-swatch red"></span>
          </label>
        </span>
        <span class="radio-button">
          <input type="radio"
                 value="yellow"
                 name="$inputColor"
                 id="$inputColorYellow"
                 onchange={ parent.save }
                 checked={ parent.scene.color === 'yellow' }>
          <label for="$inputColorYellow">
            <span class="color-swatch yellow"></span>
          </label>
        </span>
      </div>
    </div>

    <!-- TODO: figure out why save() is not being called on blur, but this works for all other fields -->

    <div class="input-row">
      <label for="$setSessionFlagsOnEnter">
        Set session flags on enter
      </label>
      <autogrow-textarea
        id="$setSessionFlagsOnEnter"
        onblur={ parent.save }
        value={ parent.scene.setSessionFlagsOnEnter }></autogrow-textarea>
    </div>

    <br>

    <a class="hotspot float-right"
        onmouseenter={ parent.toggleNotice }
        onmouseleave={ parent.toggleNotice }
        data-target="#setSessionFlagsOnEnterNotice">
        <i class="fa fa-info fa-lg"></i>
    </a>
    <div id="setSessionFlagsOnEnterNotice" class="notice text-center display-none">
      <p>
        <small>
          Use the format <strong>FLAG_NAME=FLAG_VALUE</strong> with a new flag on each line. E.g.<br>
          inventory.redKey=1
          player.poisoned=1
          <br>
          <br>
          These flags will be set when the user enters the scene.
        </small>
      </p>
    </div>

    <br>

    <div class="input-row">
      <label for="$setSessionFlagsOnExit">
        Set session flags on exit
      </label>
      <autogrow-textarea
        id="$setSessionFlagsOnExit"
        onblur={ parent.save }
        value={ parent.scene.setSessionFlagsOnExit }></autogrow-textarea>
    </div>

    <br>

    <a class="hotspot float-right"
        onmouseenter={ parent.toggleNotice }
        onmouseleave={ parent.toggleNotice }
        data-target="#setSessionFlagsOnExitNotice">
        <i class="fa fa-info fa-lg"></i>
    </a>
    <div id="setSessionFlagsOnExitNotice" class="notice text-center display-none">
      <p>
        <small>
          Use the format <strong>FLAG_NAME=FLAG_VALUE</strong> with a new flag on each line. E.g.<br>
          player.poisoned=0
          <br>
          <br>
          These flags will be set when the user exits the scene.
        </small>
      </p>
    </div>

    <br>

    <div class="input-row">
      <label for="$entryConditions">
        Set conditions for entry
      </label>
      <autogrow-textarea
        id="$entryConditions"
        onblur={ parent.save }
        value={ parent.scene.entryConditions }></autogrow-textarea>
    </div>

    <br>

    <a class="hotspot float-right"
        onmouseenter={ parent.toggleNotice }
        onmouseleave={ parent.toggleNotice }
        data-target="#entryConditionsNotice">
        <i class="fa fa-info fa-lg"></i>
    </a>
    <div id="entryConditionsNotice" class="notice text-center display-none">
      <p>
        <small>
          Use the format <strong>FLAG_NAME=FLAG_VALUE</strong> with a new condition on each line. You may also use the
          following key words to indicate conditions: <strong>AND, OR, NOT, GROUPSTART, GROUPEND</strong> E.g.
          <br>
          <br>
          player.poisoned=0<br>
          AND<br>
          GROUPSTART<br>
          inventory.redKey=1<br>
          OR<br>
          inventory.skeletonKey=1<br>
          GROUPEND<br>
          <br>
          <br>
          This will translate into the following logic code:<br>
          if(session.attributes.flags['player.poisoned'] === "0" && (session.attributes.flags.['inventory.redKey'] === "1" || session.attributes.flags.['inventory.skeletonKey'])
          <br>
          <br>
          This logic is applied before the user enters the scene. If the conditions are not met the reject Voice and Card will
          be played to the user.
        </small>
      </p>
    </div>

    <br>

  </collapsible>

  <div class="tabs">
    <div class="tab">
      <input type="radio"
             value="card"
             name="$inputTab"
             id="$inputTabCard"
             onchange={ onChangeTab }
             checked={ currentTab === 'card' }>
      <label for="$inputTabCard">
        Card
      </label>
    </div>
    <div class="tab">
      <input type="radio"
             value="voice"
             name="$inputTab"
             id="$inputTabVoice"
             onchange={ onChangeTab }
             checked={ currentTab === 'voice' }>
      <label for="$inputTabVoice">
        Voice
      </label>
    </div>
  </div>

  <div class="tab-content"
       show={ currentTab === 'card' }>

    <div class="input-row">
      <label for="$title">
        Title
      </label>
      <autogrow-textarea
        id="$title"
        onblur={ save }
        value={ scene.card.title }></autogrow-textarea>
    </div>

    <div class="input-row">
      <label for="$text">
        Text
      </label>
      <autogrow-textarea
        id="$text"
        onblur={ save }
        value={ scene.card.text }></autogrow-textarea>
    </div>

    <div class="input-row">
      <label for="$cardPrompt">
        Override Default Prompt
        <small>(Optional)</small>
      </label>
      <autogrow-textarea
        id="$cardPrompt"
        onblur={ save }
        value={ scene.card.prompt }></autogrow-textarea>
    </div>

    <br>

    <a class="hotspot float-right"
        onmouseenter={ toggleNotice }
        onmouseleave={ toggleNotice }
        data-target="#cardNotice">
        <i class="fa fa-info fa-lg"></i>
    </a>
    <div id="cardNotice" class="notice display-none">
      <p>
        <strong>Override Default Prompt</strong>:<br>
        By default, the Alexa will provide a visual "card" to
        prompt the user to respond by  reading out the all
        current available options.
      </p>
      <p>
        If you would prefer to override this default behavior,
        enter your user prompt here.
      </p>
      <p>
        <small>
          <strong>Note:</strong> Options that lead to "hidden"
          scenes will be ignored.
        </small>
      </p>
    </div>

    <br>

    <collapsible title="Image" id="$collapsibleCardImage">

      <img if={ parent.scene.card.image.smallImageUrl }
           src={ parent.scene.card.image.smallImageUrl }
           alt="Small Card Image" />
      <div class="input-row">
        <label for="$inputSmallImageUrl">
          Small Image URL
          <small>(108&times;108)</small>
        </label>
        <input type="url"
               id="$inputSmallImageUrl"
               onblur={ parent.save }
               value={ parent.scene.card.image.smallImageUrl }>
      </div>

      <img if={ parent.scene.card.image.largeImageUrl }
           src={ parent.scene.card.image.largeImageUrl }
           alt="Large Card Image" />
      <div class="input-row">
        <label for="$inputLargeImageUrl">
          Large Image URL
          <small>(512&times;512)</small>
        </label>
        <input type="url"
               id="$inputLargeImageUrl"
               onblur={ parent.save }
               value={ parent.scene.card.image.largeImageUrl }>
      </div>

      <br>

      <a class="hotspot float-right"
         onmouseenter={ parent.toggleNotice }
         onmouseleave={ parent.toggleNotice }
         data-target="#imageNotice">
        <i class="fa fa-info fa-lg"></i>
      </a>
      <div id="imageNotice" class="notice text-center display-none">
        <p>
          <small>
            <strong>Note</strong>: All image URLs must be secure (HTTPS)
          </small>
        </p>
      </div>

    </collapsible>

  </div>

  <collapsible title="Reject Options" id="$collapsibleRejectCard" show={ currentTab === 'card' }>

    <div class="input-row">
      <label for="$rejectTitle">
        Title
      </label>
      <autogrow-textarea
        id="$rejectTitle"
        onblur={ parent.save }
        value={ parent.scene.rejectCard.title }></autogrow-textarea>
    </div>

    <div class="input-row">
      <label for="$rejectText">
        Text
      </label>
      <autogrow-textarea
        id="$rejectText"
        onblur={ parent.save }
        value={ parent.scene.rejectCard.text }></autogrow-textarea>
    </div>

    <div class="input-row">
      <label for="$rejectCardPrompt">
        Override Default Prompt
        <small>(Optional)</small>
      </label>
      <autogrow-textarea
        id="$rejectCardPrompt"
        onblur={ parent.save }
        value={ parent.scene.rejectCard.prompt }></autogrow-textarea>
    </div>

    <collapsible id="$collapsibleRejectImage" title="Image">

      <img if={ parent.parent.scene.rejectCard.image.smallImageUrl }
          src={ parent.parent.scene.rejectCard.image.smallImageUrl }
          alt="Small Card Image" />
      <div class="input-row">
        <label for="$inputRejectSmallImageUrl">
          Small Image URL
          <small>(108&times;108)</small>
        </label>
        <input type="url"
          id="$inputRejectSmallImageUrl"
          onblur={ parent.parent.save }
          value={ parent.parent.scene.rejectCard.image.smallImageUrl }>
      </div>

      <img if={ parent.parent.scene.rejectCard.image.largeImageUrl }
          src={ parent.parent.scene.rejectCard.image.largeImageUrl }
          alt="Large Card Image" />
      <div class="input-row">
        <label for="$inputRejectLargeImageUrl">
          Large Image URL
          <small>(512&times;512)</small>
        </label>
        <input type="url"
          id="$inputRejectLargeImageUrl"
          onblur={ parent.parent.save }
          value={ parent.parent.scene.rejectCard.image.largeImageUrl }>
      </div>

      <br>

      <a class="hotspot float-right"
        onmouseenter={ parent.parent.toggleNotice }
        onmouseleave={ parent.parent.toggleNotice }
        data-target="#rejectImageNotice">
        <i class="fa fa-info fa-lg"></i>
      </a>
      <div id="rejectImageNotice" class="notice text-center display-none">
        <p>
          <small>
            <strong>Note</strong>: All image URLs must be secure (HTTPS)
          </small>
        </p>
      </div>

      <br>
    </collapsible>
  </collapsible>

  <div class="tab-content"
       show={ currentTab === 'voice' }>

    <div class="input-row">
      <label for="$intro">
        Speech
      </label>
      <autogrow-textarea
        id="$intro"
        onblur={ save }
        value={ scene.voice.intro }></autogrow-textarea>
    </div>

    <div class="input-row">
      <label for="$voicePrompt">
        Override Default Prompt
        <small>(Optional)</small>
      </label>
      <autogrow-textarea
        id="$voicePrompt"
        onblur={ save }
        value={ scene.voice.prompt }></autogrow-textarea>
    </div>

    <br>

    <a class="hotspot float-right"
       onmouseenter={ toggleNotice }
       onmouseleave={ toggleNotice }
       data-target="#ssmlNotice">
      <i class="fa fa-info fa-lg"></i>
    </a>
    <div id="ssmlNotice" class="notice display-none">
      <p>
        <strong>Override Default Prompt</strong>:<br>
        By default, Alexa will prompt the user to respond by
        reading out the all current available options.
      </p>
      <p>
        If you would prefer to override this default behavior,
        enter your user prompt here.
      </p>
      <p>
        <small>
          <strong>Note:</strong> Options that lead to "hidden"
          scenes will be ignored.
        </small>
      </p>
      <p>
        <strong>Supported SSML Tags</strong>
      </p>
      <br>
      <code class="row">
        <ul class="list-unstyled">
          <li>&lt;audio&gt;</li>
          <li>&lt;break&gt;</li>
          <li>&lt;speak&gt;</li>
          <li>&lt;say-as&gt;</li>
        </ul>
        <ul class="list-unstyled">
          <li>&lt;phoneme&gt;</li>
          <li>&lt;s&gt;</li>
          <li>&lt;p&gt;</li>
          <li>&lt;w&gt;</li>
        </ul>
      </code>
      <p>
        See <a href="https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference" target="_blank">Alexa <code>SSML</code> documentation</a>
        <br>
        <small>
          <strong>Note</strong>: All URLs must be secure (HTTPS)
        </small>
      </p>
    </div>

    <br>

    <collapsible title="Reject Options" id="$collapsibleRejectVoice" show={ currentTab === 'voice' }>
      <div class="input-row">
        <label for="$rejectIntro">
          Speech
        </label>
        <autogrow-textarea
          id="$rejectIntro"
          onblur={ save }
          value={ scene.rejectVoice.intro }></autogrow-textarea>
      </div>

      <div class="input-row">
        <label for="$rejectVoicePrompt">
          Override Default Prompt
          <small>(Optional)</small>
        </label>
        <autogrow-textarea
          id="$rejectVoicePrompt"
          onblur={ save }
          value={ scene.rejectVoice.prompt }></autogrow-textarea>
      </div>

    </collapsible>

  </div>

  <script type="es6">

    //TODO: add support for alternate scene description text if scene flags have already been set

    this.title = null
    this.scene = null
    this.currentTab = null

    this.mixin('toggleNotice')

    var subRoute = riot.route.create()

    subRoute('/', x => {
      this.scene = null
      this.update()
    })

    subRoute('/response:*/*', ( utterance, tab ) => {
      this.title = 'Response'
      this.subtitle = utterance
      this.scene = opts.config.responses[ utterance ]
      this.currentTab = tab === 'card' ? 'card' : 'voice'
      this.update()
    })

    subRoute('/scene:START/*', ( tab ) => {
      this.title = 'Start'
      this.subtitle = 'Skill launch'
      this.scene = opts.scenes[0];
      this.currentTab = tab === 'card' ? 'card' : 'voice'
      this.update()
    })

    subRoute('/scene:*/*', ( sceneId, tab ) => {
      this.scene = opts.scenes.find( scene => scene.id === Number( sceneId ) )
      // incase someone input an incorrect URL
      if ( ! this.scene ) return riot.route('/') // exit
      this.title = 'Scene ' + this.scene.id
      this.subtitle = this.scene.card.title
      this.currentTab = tab === 'card' ? 'card' : 'voice'
      this.update()
    })

    this.onChangeTab = e => {
      var hash = location.hash.split('/')
      hash = hash.slice( 1, hash.length -1 )
      hash.push( e.target.value )
      riot.route( hash.join('/') )
    }

    this.save = e => {
      var $advanced                     = this.$collapsibleSceneAdvanced._tag
      var $colorSelection               = [ $advanced.$inputColorDefault,
                                            $advanced.$inputColorGreen,
                                            $advanced.$inputColorRed,
                                            $advanced.$inputColorYellow ].find( x => x.checked )

      this.scene.setSessionFlagsOnEnter = $advanced.$setSessionFlagsOnEnter.value || '';
      this.scene.setSessionFlagsOnExit  = $advanced.$setSessionFlagsOnExit.value || '';
      this.scene.entryConditions        = $advanced.$entryConditions.value || '';

      this.scene.color                  = $colorSelection ? $colorSelection.value : 'default'
      this.scene.isHidden               = ( $advanced.$inputIsHiddenTrue.checked )
      this.scene.readPreviousOptions    = ( $advanced.$inputReadPreviousOptionsTrue.checked )

      this.scene.voice = {
        intro: this.$intro.value.trim(),
        prompt: this.$voicePrompt.value.trim()
      }

      var $rejectVoice = this.$collapsibleRejectVoice._tag

      this.scene.rejectVoice = {
        intro: $rejectVoice.$rejectIntro.value.trim(),
        prompt: $rejectVoice.$rejectVoicePrompt.value.trim()
      }

      var $cardImage = this.$collapsibleCardImage._tag
      this.scene.card = {
        title: this.$title.value.trim(),
        text:  this.$text.value.trim(),
        prompt: this.$cardPrompt.value.trim(),
        image: {
          largeImageUrl: $cardImage.$inputLargeImageUrl.value.trim() || null,
          smallImageUrl: $cardImage.$inputSmallImageUrl.value.trim() || null
        }
      }

      var $rejectCard = this.$collapsibleRejectCard._tag
      var $rejectCardImage = $rejectCard.$collapsibleRejectImage._tag
      this.scene.rejectCard = {
        title: $rejectCard.$rejectTitle.value.trim(),
        text:  $rejectCard.$rejectText.value.trim(),
        prompt: $rejectCard.$rejectCardPrompt.value.trim(),
        image: {
          largeImageUrl: $inputRejectLargeImageUrl.value.trim() || null,
          smallImageUrl: $inputRejectSmallImageUrl.value.trim() || null
        }
      }

      this.subtitle = this.scene.card.title

      riot.update()
    }

  </script>

</panel-edit-scene>
