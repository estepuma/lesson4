'use strict';

// Blogs controller
angular.module('blogs').controller('BlogsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Blogs',
	function($scope, $stateParams, $location, Authentication, Blogs) {
		$scope.authentication = Authentication;

		$scope.categories=[
			{ label: 'Todos',value:''},
    		{ label: 'AutoDeportivo',value:'AutoDeportivo'},
    		{ label: 'AutoFamiliar',value:'AutoFamiliar'},
    		{ label: 'Camionetadeportiva',value:'Camionetadeportiva'},
    		{ label: 'CamionetaFamiliar',value:'CamionetaFamiliar'},
    		{ label: 'VehiculoTodoterreno',value:'VehiculoTodoterreno'}
  		];

  		$scope.correctlySelected = $scope.categories[0];

		// Create new Blog
		$scope.create = function() {

			if (!$scope.validateForm()){
				return false;
			}
			console.log($scope.validateForm)
			console.log(this)


			// Create new Blog object
			var blog = new Blogs ({
				name: this.name,
				url: this.url,
				category: this.categorySelected,
				content: this.content
			});

			// Redirect after save
			blog.$save(function(response) {
				$location.path('blogs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Blog
		$scope.remove = function(blog) {
			if ( blog ) { 
				blog.$remove();

				for (var i in $scope.blogs) {
					if ($scope.blogs [i] === blog) {
						$scope.blogs.splice(i, 1);
					}
				}
			} else {
				$scope.blog.$remove(function() {
					$location.path('blogs');
				});
			}
		};

		// Update existing Blog
		$scope.update = function() {
			var blog = $scope.blog;

			blog.$update(function() {
				$location.path('blogs/' + blog._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Blogs
		$scope.find = function() {
			$scope.blogs = Blogs.query();
		};

		// Find existing Blog
		$scope.findOne = function() {
			$scope.blog = Blogs.get({ 
				blogId: $stateParams.blogId
			});
		};

		// Form validation

		$scope.validateForm = function(){
			var retorno = true;
			if (!$scope.name){
				$scope.empty = true;
				retorno = false
			} else {
				$scope.empty = false;
			}

			if (!$scope.category){
				$scope.emptyCategory = true;
				retorno = false
			} else {
				$scope.emptyCategory = false;
			}

			if (!$scope.content){
				$scope.emptyContent = true;
				retorno = false
			} else {
				$scope.emptyContent = false;
			}

			return retorno;
		}

		$scope.clearAlerts = function(){
			if ($scope.name){
				$scope.empty=false;
			}

			if ($scope.category){
				$scope.emptyCategory=false;
			}
			
			if ($scope.content){
				$scope.emptyContent=false;
			}
			
		}
	}
]);