(function() {
  'use strict';

  angular
    .module('App')
    .factory('_', lodash);

  lodash.$inject = ['$window'];

  function lodash($window) {
    return $window._;
  }

})();
