import riot from "riot"
import saveAs from "./saveAs"
import mapTag from "../tags/js/map"
import navTag from "../tags/js/nav"
import helpTag from "../tags/js/help"
import sceneTag from "../tags/js/scene"
import panelTag from "../tags/js/panel"
import panelHomeTag from "../tags/js/panel-home"
import panelEditSceneTag from "../tags/js/panel-edit-scene"
import panelEditOptionTag from "../tags/js/panel-edit-option"
import autogrowTextareaTag from "../tags/js/autogrow-textarea"
import collapsibleTag from "../tags/js/collapsible"

import toggleNoticeMixin from "../tags/mixins/toggleNotice"

import config from "../skill/models/config.json!"
import scenes from "../skill/models/scenes.json!"

riot.mixin('toggleNotice', toggleNoticeMixin )

riot.mount('map', { config, scenes })
riot.mount('help', { config, scenes })
riot.mount('panel', { config, scenes })

riot.route.base('#/')
riot.route.start( true )

var subRoute = riot.route.create()

window.addEventListener('beforeunload', function() {
  if ( confirm('Do you want to save changes?') ) {
    save()
  }
  else {
    return true
  }
})

document.addEventListener('keydown', e => {
  if ( e.keyCode == 27 && location.hash === '#/help' ) {
    history.back()
  }
  if (event.ctrlKey || event.metaKey) {
    switch (String.fromCharCode(event.which).toLowerCase()) {
      case 's':
          event.preventDefault()
          save( false )
          break
      case 'u':
          event.preventDefault()
          save( true )
          break
      case 'h':
          event.preventDefault()
          riot.route('/help')
          break
    }
  }
})

subRoute('/save', function () {
  save()
  history.back()
})

subRoute('/upload', function () {
  save( true )
  history.back()
})

function save ( upload ) {

  scenes.sort( ( a, b ) => a.id - b.id )

  var payload = { config, scenes }
  if ( upload ) payload.upload = true
  var json = JSON.stringify( payload, null, 2 )

  var httpRequest = new XMLHttpRequest()
  httpRequest.onreadystatechange = onReadyStateChange
  httpRequest.open('POST','/persist')
  httpRequest.send( json )

  function onReadyStateChange() {
    if ( httpRequest.readyState === XMLHttpRequest.DONE ) {
      if ( httpRequest.status === 200 ) {
        flashMessage('success', upload ? 'Uploaded' : 'Saved' )
      } else {
        flashMessage('error', ( upload ? 'Upload ' : 'Save ' ) + 'Error. Consult your terminal window.')
      }
    }
  }

}

function flashMessage ( className, text ) {

  var message = document.createElement('div')
  message.classList.add('message', className )
  message.innerText = text

  document.body.appendChild( message )
  setTimeout( function () {
    document.body.removeChild( message )
  }, 1000 )

}
