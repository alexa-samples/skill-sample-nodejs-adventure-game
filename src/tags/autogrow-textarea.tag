<autogrow-textarea>

  <textarea name="$textarea"
            value={ opts.value || '' }
            onblur={ opts.onblur }
            onfocus={ opts.onfocus }
            onclick={ opts.onclick }
            onkeyup={ onKeyUp }
            onkeydown={ opts.onkeydown }
            onmouseup={ opts.onmouseup }
            onmousedown={ opts.onmousedown }
            onmouseenter={ opts.onmouseenter }
            onmouseleave={ opts.onmouseleave }
            onkeypress={ onKeyPress }></textarea>

  <script type="es6">

    this.on('mount', x => {
      this.root.value = this.$textarea.value
    })

    this.on('unmount', x => {
      this.$textarea.value = ''
    })

    this.on('updated', x => {
      this.root.value = this.$textarea.value
      resize.bind( this )( this.$textarea )
    })

    this.onKeyPress = e => {
      e.preventUpdate = true
      resize.bind( this )( this.$textarea )
      if ( typeof opts.onkeypress === 'function' ) {
        opts.onkeypress( e )
      }
      return true
    }

    this.onKeyUp = e => {
      e.preventUpdate = true
      resize.bind( this )( this.$textarea )
      this.root.value = this.$textarea.value
      if ( typeof opts.onkeyup === 'function' ) {
        opts.onkeyup( e )
      }
      return true
    }

    function resize ( el ) {
      if ( ! el ) return

      this.root.style.height = el.style.height

      el.style.height = '1em'
      el.style.height = el.scrollHeight + 'px'

      this.root.style.height = el.style.height
    }

  </script>

</autogrow-textarea>
