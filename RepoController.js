(function() {
  
  var module = angular.module("githubViewer");
  
  var RepoController = function($scope, $routeParams, github){ //$scope for data binding, $routeparams so it can figure out what usernmae and reponame we're searching for, and the github service.
    var onRepo = function(data){
      $scope.repo = data;
    };
    
    var onError = function(reason){
      $scope.error = reason;
    };
    
    
    
    var reponame = $routeParams.reponame;
    var username = $routeParams.username; // need both of these to get the details of a repository.
    //these two - username and reponmae - just need to match the way i described them to the routing engine - all lowercase in this case.
      github.getRepoDetails(username, reponame)
            .then(onRepo, onError);
            
            
  };
    
  
  
  
  
  
  module.controller("RepoController", RepoController);
  
  
}());