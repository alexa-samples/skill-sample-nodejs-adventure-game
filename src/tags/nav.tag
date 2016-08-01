<app-nav>

  <button type="button"
          title="Home"
          onclick={ home }>
    <i class="fa fa-home fa-lg"></i>
  </button>

  <h1>
    <img src="logo-alexa.jpg" alt="Alexa Skill Editor" height="25px"/>
  </h1>

  <div>
    <button type="button"
            title="Save"
            onclick={ saveConfig }>
      <i class="fa fa-save fa-lg"></i>
    </button>
    <button type="button"
            title="Upload"
            onclick={ uploadConfig }>
      <i class="fa fa-cloud-upload fa-lg"></i>
    </button>
    <button type="button"
            title="Help"
            onclick={ help }>
      <i class="fa fa-info fa-lg"></i>
    </button>
  </div>

  <script type="es6">

      this.home = e => {
        riot.route('/')
      }

      this.help = e => {
        riot.route('/help')
      }

      this.saveConfig = e => {
        riot.route('/save')
      }

      this.uploadConfig = e => {
        riot.route('/upload')
      }

  </script>

</app-nav>
