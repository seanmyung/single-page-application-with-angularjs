
(function() {
  'use strict';

  angular.module("app")
  
  .controller('RecipesController', function($scope,$location, $window, dataService) {

    //Gets all of the recipes 
    dataService.getRecipes(function(response) {
      console.log(response.data); 
      $scope.recipes = response.data; 

      $scope.hasRecipes = true; 
    });

    //Gests all of the categories 
    dataService.getCategories(function(response) {
      console.log(response.data); 
      $scope.categories = response.data; 
    });

    //Gets all of the recipes for the specified category
    $scope.getRecipesCategory = function() {

      if($scope.selectedCategories !== null) {

        dataService.getRecipesCategory($scope.selectedCategories.name, function(response) {
          console.log(response.data); 
          $scope.recipes = response.data; 

          if($scope.recipes.length > 0) {
            $scope.hasRecipes = true; 
          } else {
            $scope.hasRecipes = false; 
          };

        }); //end dataService.getRecipesCategory 

      } else {

        //Gets all of the recipes 
        dataService.getRecipes(function(response) {
          console.log(response.data); 
          $scope.recipes = response.data; 

          $scope.hasRecipes = true; 

        });

      } // end else 

    }; // end getRecipesCategory

    //Move to the page to add a new recipe 
    $scope.addRecipes = function(path) {
      $location.path(path);

    }

    //Deletes the recipe for the specified ID 
    $scope.deleteRecipesById = function(id) {
      //$scope.recipes.splice($index, 1);
      var confirmDelete = confirm("Warning! You can't restore this recipe information. Are you sure to delete it?")
      
      if(confirmDelete) {
        dataService.deleteRecipesById(id, function(response) {
          $window.location.reload();

        });//end dataService.deleteRecipesById

      }//end if 

    }//end deleteRecipesById

  })//end controller

})();


