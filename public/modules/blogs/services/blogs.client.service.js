'use strict';

//Blogs service used to communicate Blogs REST endpoints
angular.module('blogs').factory('Blogs', ['$resource',
	function($resource) {
		return $resource('blogs/:blogId', { blogId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

// Resource contiene los metodos GET, POST, PUT, DELETE