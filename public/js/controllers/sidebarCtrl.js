app.controller('sidebarCtrl', function($scope) {

  angular.element(document).ready(function(){

    $scope.item = false
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

    $scope.toggleMenu = (navItem) => {

      $scope.item = navItem

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

        setTimeout(function(){
          $('#report-input').focus();
        }, 100);
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

    }


    $scope.submitReport = (reportSubmission) => {
      let report = reportSubmission

      if(!report){
        setTimeout(function(){
          $('#report-input').addClass('error')
          console.log(report);
        }, 50);
      }
      if(report) {
        setTimeout(function(){
          $('#report-label').html('Your report has been sent successfully!')
          $('#report-input').val('')
          $('#report-input').removeClass('error')
          $scope.report = ''
        }, 300);
      }
    }

    // Remove error class
    $scope.reportFocus = () => {
      $('#report-label').html('How can we improve?')
      $('#report-input').removeClass('error')
      $('#report-input').keypress(function(event){
        $('#report-input').removeClass('error')
      });
    }

  })

})
