(function() {
  'use strict';

  angular
    .module('App')
    .directive('dialogs', dialogs);

  function dialogs(){
    let directive = {
      restrict:'E',
      scope:{
      },
      templateUrl: '/templates/dialogs.html',
      controller: Dialogs,
      link: Link
    };

    return directive;
  };
  
  Dialogs.$inject = ['$scope', 'dataAssistant'];

  function Dialogs($scope, dataAssistant){

  }

  Link.$inject = ['$scope', '$element'];

  function Link($scope, $element){
    
    $element.find('#test').on('show.bs.modal', function(e){

      $scope.$digest();
    });
  }

})();	
