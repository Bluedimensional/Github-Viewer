(function() { //IIFE
  //service implemented
  var github = function($http) {
    /*angular invokes this github function, and i'll return an object that is the gihub service. it will represent the public API.
        The service has to do two things - get a user and get the repositories for a user. to do either of those things, it's going to need the $http service. a service can have a dependency on another service, so github service requires the $http service.*/


    var getUser = function(username) { // if i call getUser, i'll pass in a usernmae
      //make call to $http.get - that will return a promise
      return $http.get("https://api.github.com/users/" + username)
        //call .then on that promise so that when that $http call is complete, it will call my function, passing in a response, dig out that data, and
        .then(function(response) {
          //return that data
          return response.data;
        });
      //when you return something from a function that is involed by .then, it will be wrapped by .then into another promise that is given back to the caller
    };

    var getRepos = function(user) { // pass me a user object and i
      return $http.get(user.repos_url)// do an $http.get against the user parameter that is passed to me.
        .then(function(response) { // return the promise that i will return this, which is response.data
          return response.data; // proccessing the response so the controller doesn't have to.
        });
    };
    // RepoController needs two $http calls. one will get the details of a repository. from there, open issues. a second call for the contributors for a project. then list the names of the contributors and their gravatar images.
   
  
    var getRepoDetails = function(username, reponame){
        var repo; //repo details and contributors info to return to whoever called it, so return repo is the goal. But first i need to populate that object with all of the information we need. to do that, i'll call the Github API server
        var repoUrl = "https://api.github.com/repos/" + username + "/" + reponame; 
        //I need to return a promise. Because all of this is going to be asynchronous, I need to return $hhtp.get and call that repoUrl, but don't want the raw response. I want to add a .then
        
        return $http.get(repoUrl) //each return is the input to the next success function
              .then(function(response){ /*adding the .then and have a function that will process that response on behalf of the controller. Before when we had getUser and getRepos, we did simple processing of the response just to return response.data, and ultimately inside of the controller when it calls .getUser.then inside of:
              github.getUser.then(function(data){ 
              $scope.user = data;
              });
            what the .then is waiting for is response.data. But in getRepoDetails, i don't want just the repository information, i want also contributor information, and give back the controller an object full of information about the repository and all the contributors. Thus, below I use return $http.get instead of return data.
              */
                  repo = response.data; // next going to return $http.get on that repoUrl again, but will add in the /contributors
                  return $http.get(repoUrl + "/contributors");
                  
              })
              .then(function(response){
                repo.contributors = response.data; // i have taken that contributor info and attached it to my repository object.
                return repo;
              })
    };

    //when any controller or anything inside of this application says 'give me something called github', they will get back this object, something they can call .getUser or .getRepos.
    return {
      getUser: getUser,
      getRepos: getRepos,
      getRepoDetails: getRepoDetails
    };
  };


  var module = angular.module("githubViewer");
  //register service with angular so other services can use it
  //using factory, pass in the name of the service, "github", pass in something that points to a function that returns an object, with the API you want.
  //
  module.factory("github", github);


}());

/* why build my own service?
- create reusable logic
- create shard data
- manage complexity

-- about this Github service --
we'll use $http service inside of this new service instead of directly from our controller, which will simplify the code of our container, and manage complexity.




*/