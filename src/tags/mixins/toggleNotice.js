var mixin = {
  toggleNotice: function ( e ) {
    var target = document.querySelector( e.currentTarget.dataset.target )
    if ( ! target ) return // exit
    if ( target.classList.contains('display-none') ) {
      target.classList.remove('display-none')
    }
    else {
      target.classList.add('display-none')
    }
  }
}

export default mixin
