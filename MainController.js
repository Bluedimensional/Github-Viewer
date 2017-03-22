(function() {

  var app = angular.module("githubViewer");

  var MainController = function($scope, $interval, $location) { //asking angular to provide my controller with $interval service instead of js's setInterval
    //$location allows me to move to a particular route from a code inside a controller.

    var decrementCountdown = function() {
      $scope.countdown -= 1; // subtract 1 from countdown
      if ($scope.countdown < 1) { // if countdown is less than 1, or 0, automatic search
        $scope.search($scope.username); // username is passed in because search requires a username and that is the model value that is bound to the search
      }
    };

    var countdownInterval = null; // when we call $interval, i will store the return value into that variable
    var startCountdown = function() { // when startCountdown gets invoked, it's going to to to $interval and tell $interval to call decrementCountdown every 2000ms, for 5 intervals.
      countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown); // resets itself until i cancel
    };

    $scope.search = function(username) {
      if (countdownInterval) { // when we do a search, need to check to see if there is an countdownInterval, because if there is, i want to cancel that $interval.
        $interval.cancel(countdownInterval); // if countdownInterval is truthy (because it's not null), then i can walk up to $interval service and tell it to cancel; need to pass in that object.
        $scope.countdown = null; // take leftover countdown off screen 
      }



      $location.path("/user/" + username); // changes the client fragment to #/user/someuser

    };


    $scope.username = "angular"; // default
    $scope.countdown = 3; // countdown to enter search terms or automatic search
    startCountdown(); //


  };

  app.controller("MainController", MainController);

}());