$(document).ready(function() {
  setTimeout(() => {
    $('#logo-container').css('opacity', '1')
    $('#logo-container').css('transform', 'translateY(0)')
  }, 300)

  setTimeout(() => {
    $('#logo-box').css('background', '#FD515C')
  }, 400)

  setTimeout(() => {
    $('#intro-container').css('opacity', '0')
  }, 2500)

  // setTimeout(() => {
  //   $('#intro-container').css('display', 'none')
  // }, 3000)

  // setTimeout(() => {
  //   $('#logo-container').css('transition', 'opacity, .2s ease-in')
  // }, 2000)
  // setTimeout(() => {
  //   $('#logo-container').css('opacity', '0')
  //   $('#logo-container').css('transform', 'translate3d(0,40%,0)')
  // }, 2500)

  // TweenMax.to('#logo-container', 1, { y:-100 , opacity:0 , ease:Expo.easeInOut});

})
