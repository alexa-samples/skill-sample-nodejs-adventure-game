<collapsible class={ 'is-open': opts.isOpen }>

  <collapsible-title id="$title" >
    <icon></icon>
    { opts.title }
  </collapsible-title>

  <collapsible-content>
    <yield/>
  </collapsible-content>

  <script type="es6">

    opts.isOpen = opts.isOpen || false

    this.$title.addEventListener('click', e => {
        opts.isOpen = ! opts.isOpen
        this.update()
    })

  </script>

</collapsible>
