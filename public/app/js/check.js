(function() {
  'use strict';

  angular
    .module('App')
    .directive('check', check);

  function check(){
    let directive = {
      restrict:'E',
      scope:{
      },
      templateUrl: '/templates/check.html',
      controller: Check,
      link: Link
    };

    return directive;
  };
  
  
  Check.$inject = ['$scope', 'dataAssistant', "$window"];

  function Check($scope, dataAssistant, $window){
    
    $scope.test = {};

    $scope.signed = false;
    $scope.checked = false;

    $scope.init = function(){
      
    };

    $scope.check = function(){
       startLoading();
       let document = $scope.$parent.contracts.document.contract;
       let sha256 = $window.CryptoJS.SHA256($scope.file.data);
       console.log(sha256);
       document.agrStatus.call($window.web3.toBigNumber(sha256.toString()), (err, data) => {
         stopLoading();
         console.log(data);
         $scope.signed = data.c.length > 1;
         $scope.checked = true;
       });
    }
    
  }

  Link.$inject = ['$scope', '$element'];

  function Link($scope, $element){

    $element.find('#check_file').change((e) => {
      
      $scope.file = {};
      
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
