
(function() {
  'use strict';

  angular.module("app")
  
  .controller('RecipeDetailController', function($scope, $location, dataService) {

    $scope.path = $location.path();
    $scope.recipeId = $location.path().substr(6);
    $scope.showErrors = false;
    $scope.recipe = {};

    //Gets all of the recipes 
    dataService.getCategories(function(response) {
      console.log(response.data); 
      $scope.categories = response.data; 
    });

    if($scope.path.includes('edit')) {
      $scope.editAddOption = true;

      //Gets the recipe for the specified ID 
      dataService.getRecipesById($scope.recipeId, function(response) {        
        $scope.recipe = response.data; 
        console.log(response.data); 
        console.log("Edit mode");
      });       

    } else {
      $scope.editAddOption = false;
      console.log("Add mode");
      $scope.recipe = {
        name: "",
        description: "",
        category: "",
        prepTime: 0,
        cookTime: 0,
        ingredients: [{foodItem: "", condition: "", amount: ""}],
        steps: [{description: ""}]
      } 
    }//end else

    //Go to the main page 
    $scope.backToTheMain = function (){
      $location.path('/');
      console.log("Return to the main page");
    };

    //Save a new recipe based on whether the edit mode or add mode after validation check
    $scope.saveRecipe = function () {
      if(validationForm()) {
        $scope.showErrors = true;
        console.log("Error! Check your input field again!")
      } else {
        if($scope.path.includes('edit')) {
          $scope.updateRecipesById();
        } else {
          $scope.addNewRecipes();
        }//end else 
      }//end else 
    }

    //updates the recipe for the specified ID 
    $scope.updateRecipesById = function() {
      dataService.updateRecipesById($scope.recipeId, $scope.recipe, function(response) {
        $scope.recipe = response.data; 
        console.log("Your recipe was updated successfully");
        $location.path('/');
      });  
    }


    //updates the recipe for the specified ID 
    $scope.addNewRecipes = function() {
      dataService.addNewRecipes($scope.recipe, function(response) {
        $scope.recipe = response.data; 
        console.log("Your recipe was added successfully");
        $location.path('/');
      });  
    }

    //check validation each fileld 
    function validationForm() {
      $scope.errors = []; 

      if($scope.recipe.name === "") {
        $scope.errors.push("Name is required");
      }
      if($scope.recipe.description === "") {
        $scope.errors.push("Description is required");
      }
      if($scope.recipe.category === "") {
        $scope.errors.push('Category is required');
      }
      if($scope.recipe.prepTime === 0) {
        $scope.errors.push('Prep Time is required');
      }
      if($scope.recipe.cookTime === 0) {
        $scope.errors.push('Cook Time is required');
      } 
      if($scope.errors.length > 0) {
        return true;
      } else {
        return false;
      }
    }

    //Gets all of the food items 
    dataService.getFooditems(function(response) {
      console.log(response.data); 
      $scope.fooditems = response.data; 
    });
    //Delete a ingredient field 
    $scope.deleteIngredient = function($index) {
      $scope.recipe.ingredients.splice($index,1);
    };
    //Add a ingredient field
    $scope.addIngredient = function() {
      $scope.recipe.ingredients.push({foodItem: "", condition: "", amount: ""});
    };
    //Delete a step field
    $scope.deleteStep = function($index) {
      $scope.recipe.steps.splice($index,1); 
    };
    //Add a step field 
    $scope.addStep = function() {
      $scope.recipe.steps.push({description: ""});
    }

  })// end controller 

})(); // end function


