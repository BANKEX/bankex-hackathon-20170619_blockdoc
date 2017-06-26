(function() {
  'use strict';

  angular
    .module('App')
    .factory('dataAssistant', dataAssistant);

  dataAssistant.$inject = ['$http'];

  function dataAssistant($http) {
    /*$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    
    $http.defaults.transformRequest = [function(data) {
        var str = [];
        for(var key in data)
        str.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
        return str.join("&");
    }]*/    

    return {
      get:  get,
      put:  put,
      post: post
    };

    function get(url, options){
      return $http.get(url, options);
    }

    function put(url, data, options){
      return $http.put(url, data, options);
    }

    function post(url, data, options){
      return $http.post(url, data, options);
    }
  }

})();
