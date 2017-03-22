(function() {

    var app = angular.module("githubViewer");

    var UserController = function($scope, github, $routeParams) {

      var onUserComplete = function(data) {
        $scope.user = data;
        //say github.getRepos, pass in $scope.user, which calls function(user) in github.js
        github.getRepos($scope.user)
        //can use promise to say onRepos or onError.
          .then(onRepos, onError);
      };

      var onRepos = function(data) {
        $scope.repos = data;
      };

      var onError = function(reason) {
        $scope.error = "Could not fetch the user info";
      };

      $scope.username = $routeParams.username; // makes username available as a property
      $scope.repoSortOrder = "-stargazers_count";
      github.getUser($scope.username).then(onUserComplete, onError); // I say Github service, let's get the user, $scope.usernamne. And when complete, use the existing onUserComplete function, or onError.
       
     };

  app.controller("UserController", UserController);

}());