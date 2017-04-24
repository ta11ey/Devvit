angular.module('devvit').service('groupsService', function($http, $rootScope){

	this.getGroups = function (active_user_id){
		return $http({
			method:'get',
			url: '/active/'+ active_user_id
		}).then(function(res){
			return res.data.groups
			})
	};
	
	this.findProject = function(project_id){
		return $http({
			method:'get',
			url: '/project/' + project_id
		}).then(function(res){
			return res.data[0]
			})
	}
	this.sendGroupMessage = function (message){
		return $http({
			method:'post',
			url: '/groupmessage',
			data: message
		}).then(function(res){
			console.log(res.data.messages)
			return res.data.messages
		})
	}
	this.acceptApplied = function (data){
		return $http({
			method: 'put',
			url: '/accept',
			data: data
		}).then(function(res){
			console.log(res)
			return res.data.members
		})
	}
	this.denyApplied = function (data){
		return $http({
			method: 'put',
			url: '/deny',
			data: data
		}).then(function(res){
			console.log(res)
			return res.data.members
		})
	}
	
})
