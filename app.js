(function() { //IIFE 

  var app = angular.module("githubViewer", ["ngRoute"]); //explicit dependencies inside the array

  app.config(function($routeProvider) {
    $routeProvider
    //main view will be the entry point for the application, something that will appear on the screen when the user is at "/main". 
      .when("/main", {
        //  Tell Angular, when it does see this url, here is the template to load main.html.
        templateUrl: "main.html",
        controller: "MainController"
      })
      .when("/user/:username", {
        templateUrl: "user.html",
        controller: "UserController"
      })
      .when("/repo/:username/:reponame", {
        templateUrl: "repo.html",
        controller: "RepoController"
      })
    .otherwise({
      redirectTo: "/main"
    });
  });




}());