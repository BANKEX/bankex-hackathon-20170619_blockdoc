(function() {
  'use strict';

  angular
    .module('App')
    .directive('accept', accept);

  function accept(){
    let directive = {
      restrict:'E',
      scope:{
      },
      templateUrl: '/templates/accept.html',
      controller: Accept,
      link: Link
    };

    return directive;
  };
  
  
  Accept.$inject = ['$scope', 'dataAssistant', "$window"];

  function Accept($scope, dataAssistant, $window){
    $scope.file = {};

    $scope.init = function(){
      
    }

    $scope.assign = function(){
       let document = $scope.$parent.contracts.document.contract;
       let sha256 = $window.CryptoJS.SHA256($scope.file.data);
       document.sign.sendTransaction(sha256, (err, transaction) => {
        console.log(transaction);
       });
    }

  }

  Link.$inject = ['$scope', '$element'];

  function Link($scope, $element){

    $element.find('#accept_file').change((e) => {
      
      
      $scope.file.filename = e.target.files[0].name;
      console.log($scope.file.filename);

      var reader = new FileReader();

      reader.onload = function(e){
        const f = btoa(e.target.result);
        console.log(f.substr(0, 100));
        $scope.file.data = f;

      };

      reader.readAsDataURL(e.target.files[0]);
    });
  }

})();	
