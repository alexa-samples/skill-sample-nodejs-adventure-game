<panel>

  <!-- NAV -->
  <app-nav></app-nav>

  <!-- GLOBALS -->
  <panel-home
    if={ menu === 'home' }
    config={ opts.config }></panel-home>

  <!-- OPTION DETAILS -->
  <panel-edit-option
    if={ menu === 'option' }
    scenes={ opts.scenes }></panel-edit-option>

  <!-- SCENE DETAILS -->
  <panel-edit-scene
    if={ menu === 'scene' }
    config={ opts.config }
    scenes={ opts.scenes }></panel-edit-scene>

  </form>

  <script type="es6">

    this.menu = null

    var subRoute = riot.route.create()

    subRoute('/', x => {
      this.menu = 'home'
      this.update()
    })

    subRoute('/response:*/*', ( utterance ) => {
      this.menu = 'scene'
      this.update()
    })

    subRoute('/scene:START/*', ( sceneId, utterance, tab ) => {
      this.menu = 'scene'
      this.update()
    })

    subRoute('/scene:*/option:*', x => {
      this.menu = 'option'
      this.update()
    })

    subRoute('/scene:*/*', ( sceneId, tab ) => {
      this.menu = 'scene'
      this.update()
    })

  </script>
</panel>
