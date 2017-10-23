app.controller('sidebarCtrl', function($scope) {

  angular.element(document).ready(function(){

    $scope.item = false
    console.log($scope.item);
    let clicked = false

    $scope.toggleNav = () => {
      $('.hamburger').toggleClass('active')
      if(!clicked) {
        function animate(){
          TweenMax.to("#navigation", .3, {x: 0});
        }
        setTimeout(function(){
          animate()
        }, 10);
        clicked = true
      }
      else {
        function animate(){
          TweenMax.to("#navigation", .3, {x: -380});
        }
        setTimeout(function(){
          animate()
        }, 10);
        clicked = false

        $('#navigation-expanded').css('transition','all .4s cubic-bezier(.615,.19,.305,.91)')
        $('#navigation-expanded-mask-1').css('transition','all .4s cubic-bezier(.615,.19,.305,.91)')
        $('#navigation-expanded-mask-2').css('transition','all .4s cubic-bezier(.615,.19,.305,.91)')
        $('#navigation-expanded').removeClass('active')
        $('#navigation-expanded-mask-1').removeClass('active')
        $('#navigation-expanded-mask-2').removeClass('active')

        $('#first').removeClass('selected')
        $('#second').removeClass('selected')
        $('#third').removeClass('selected')

        $('#first').removeClass('unselected')
        $('#second').removeClass('unselected')
        $('#third').removeClass('unselected')
      }
    }

    // $('#first').on('mouseenter', function(){$('#second').css('opacity','.15');$('#third').css('opacity','.15');});
    // $('#first').on('mouseleave', function(){$('#second').css('opacity','1');$('#third').css('opacity','1');});
    // $('#second').on('mouseenter', function(){$('#first').css('opacity','.15');$('#third').css('opacity','.15');});
    // $('#second').on('mouseleave', function(){$('#first').css('opacity','1');$('#third').css('opacity','1');});
    // $('#third').on('mouseenter', function(){$('#second').css('opacity','.15');$('#first').css('opacity','.15');});
    // $('#third').on('mouseleave', function(){$('#second').css('opacity','1');$('#first').css('opacity','1');});


    $scope.toggleMenu = (navItem) => {

      $scope.item = navItem
      console.log($scope.item);
      console.log(navItem);
      // $('#first').removeClass('selected')
      // $('#second').removeClass('selected')
      // $('#third').removeClass('selected')

      if(navItem == 'first') {
        $('#first').removeClass('unselected')
        $('#second').removeClass('selected')
        $('#third').removeClass('selected')

        $('#first').addClass('selected')
        $('#second').addClass('unselected')
        $('#third').addClass('unselected')
      }

      if(navItem == 'second') {
        $('#second').removeClass('unselected')
        $('#first').removeClass('selected')
        $('#third').removeClass('selected')

        $('#first').addClass('unselected')
        $('#second').addClass('selected')
        $('#third').addClass('unselected')
      }

      if(navItem == 'third') {
        $('#third').removeClass('unselected')
        $('#first').removeClass('selected')
        $('#second').removeClass('selected')

        $('#first').addClass('unselected')
        $('#second').addClass('unselected')
        $('#third').addClass('selected')
      }

      $('#navigation-expanded').css('transition','all .3s')
      $('#navigation-expanded-mask-1').css('transition','all .3s')
      $('#navigation-expanded-mask-2').css('transition','all .3s')
      $('#navigation-expanded').addClass('active')
      $('#navigation-expanded-mask-1').addClass('active')
      $('#navigation-expanded-mask-2').addClass('active')

      // function animate(){
      //   TweenMax.to("#navigation-expanded", .3, {left: -380}, {setSize:{width:auto}});
      // }
      // setTimeout(function(){
      //   animate()
      // }, 10);
    }

  })

})
