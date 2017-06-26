(function() {
  'use strict';

  angular
    .module('App')
    .factory('socketUtils', socketUtils);

  socketUtils.$inject = [];

  function socketUtils() {
    var socket = io('/');
    return {
      socket: socket
    };

  }

})();
