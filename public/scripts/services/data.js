
(function() {
  'use strict';

  angular.module("app")
  
  .service('dataService', function($http) {

    this.getRecipes = function(callback) {
      $http.get('http://localhost:5000/api/recipes')
      .then(callback)

    }

    this.getCategories = function(callback) {
      $http.get('http://localhost:5000/api/categories')
      .then(callback)

    }

    this.getRecipesCategory = function(category, callback) {
      $http.get('http://localhost:5000/api/recipes?category=' + category)
      .then(callback)

    }

    this.addNewRecipes = function(data, callback) {
      $http.post('http://localhost:5000/api/recipes/', data)
      .then(callback)

    }

    this.deleteRecipesById = function(id, callback) {
      $http.delete('http://localhost:5000/api/recipes/' + id)
      .then(callback)
    }

    this.getFooditems = function(callback) {
      $http.get('http://localhost:5000/api/fooditems')
      .then(callback)

    }

    this.getRecipesById = function(id, callback) {
      $http.get('http://localhost:5000/api/recipes/' + id)
      .then(callback)

    }  

    this.updateRecipesById = function(id, data, callback) {
      $http.put('http://localhost:5000/api/recipes/' + id, data)
      .then(callback)

    }

  })

})();
