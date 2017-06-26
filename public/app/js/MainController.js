(function() {
  'use strict';

  angular
    .module('App')
    .controller('MainController', MainController);

    MainController.inject = ['$scope', 'dataAssistant', 'socketUtils', '$timeout', '$window'];

    function MainController($scope, dataAssistant, socketUtils, $timeout, $window) {
    	$scope.page = 'create';
			$scope.main_agreement = 'Hereby I unconditionally accept Terms and Conditions of the Protocol in respect of the Ethereum address ';
			$scope.contracts = {};

			$scope.init = function(){
				let agreement = {};
				agreement.abi = [{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_hash","type":"string"}],"payable":false,"type":"constructor"}];
				
				agreement.address = '0x13619c16150e5949ff7de4dd450c093accf503b8';
				$scope.contracts.agreement = agreement;

				let document = {};
				document.abi =[{"constant":false,"inputs":[{"name":"_hash","type":"bytes32"},{"name":"_second","type":"address"}],"name":"init","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_hash","type":"bytes32"}],"name":"agrParties","outputs":[{"name":"_first","type":"address"},{"name":"_second","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_hash","type":"bytes32"}],"name":"sign","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_hash","type":"bytes32"}],"name":"agrStatus","outputs":[{"name":"_status","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_hash","type":"bytes32"}],"name":"agrCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_hash","type":"bytes32"}],"name":"agrSigned","type":"event"}];
				document.address = '0xaab59984e05d878de2c52d87863317a917d1a0f6';
				$scope.contracts.document = document;

				if($window.web3 !== undefined){
					let agreement = $scope.contracts.agreement;
					$scope.contracts.agreement.contract = $window.web3.eth.contract(agreement.abi).at(agreement.address);
				
					let document = $scope.contracts.document;
					$scope.contracts.document.contract = $window.web3.eth.contract(document.abi).at(document.address);
		    }


			}
		
			$scope.showCreate = function(){
				$scope.page = 'create';
			}

			$scope.showAccept = function(){
				$scope.page = 'accept';
			}

			$scope.showCheck = function(){
				$scope.page = 'check';
			}
						
    }
})();