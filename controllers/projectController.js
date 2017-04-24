var Projects = require('../models/projects')
var Users = require('../models/users')
var mongoose = require('mongoose')
module.exports = {
	createProj: function(req, res) {
		Projects.create(req.body, function(err, project) {
			if (err) {
				return res.status(500).send(err)}
			else{
				Projects.findByIdAndUpdate(project._id, {$push:{admins: req.body.active_user_id}}, function(err, result) {
					if (err) {
						return res.status(500).send(err)}
					else{
						Users.findByIdAndUpdate(req.body.active_user_id, 
						{$push:{activePosts: project._id}}, 
						function(err, result) {
							if (err) {return res.status(500).send(err)}
							// else{
							// 	res.json(result);
							// }
						});
						Users.findByIdAndUpdate(req.body.active_user_id, 
						{$push:{groups: project._id}}, 
						function(err, result) {
							if (err) {return res.status(500).send(err)}
							else{
								res.json(result);
							}
						})
					}
				})
			};
		})
	},

	apply: function (req, res){
		Projects.findById(req.body.project_id, function(err, project){
			if (err) return res.status(500).send(err);
			if(project.members.length == 0) {
				project.members.push({
						application:{
							message:req.body.message
							},
						member: req.body.active_user_id
					});//add message to project app
				addProjectToUser(req.body.active_user_id, project, req.body.message, res);
				project.save(function(err) {
					if (err) return res.status(500).send(err);	
				});
				if (req.body.message){
					sendMessageToAdmins(project, req.body.active_user_id,  req.body.message, res)
				}
			} 
			else {
				var memberExists = false;
				project.members.forEach(function(elem) {
					if(elem.member.toString() === req.body.active_user_id) {
						memberExists = true;
					}
				})		
				if (!memberExists){			
						project.members.push({
							member: req.body.active_user_id,
							application: {
								message: req.body.message
							}
						});
						addProjectToUser(req.body.active_user_id, project, req.body.message, res);
						project.save(function(err) {
							if (err) return res.status(500).send(err);	
						});
						if (req.body.message){
							sendMessageToAdmins(project, req.body.active_user_id, req.body.message, res)
						}
					}				
			}
			res.json(project)
		})
		
	},
	
	accept: function(req, res){
			var id = mongoose.Types.ObjectId(req.body.project_id);
			Projects.findById(req.body.project_id,  function(err, project) {
				if (err) {return res.status(500).send(err)}
				else{
					project.members.forEach(function(member){
						if (member.member.toString() === req.body.user_id){
							member.application.pending = false;						
						}
					

				
					addProjectToUserGroups(req.body.project_id, req.body.user_id, res)
					})
					project.save(function(err) {
								if (err) return res.status(500).send(err);	
							})
				}
			})

			Users.findByIdAndUpdate(req.body.user_id, 
				{$pull:{pendingApprovals:id}}, 
				function(err, success) {
					if (err) return res.status(500).send(err);
					else res.send(success)
				})			
	},
	
	deny: function(req, res){
		removeUserFromProject(req.body.user_id, req.body.project_id, res);
		removeProjectFromUser(req.body.user_id, req.body.project_id, res);
		res.send('user denied')
	},
	
	destroy: function(req, res) {
		Projects.findByIdAndRemove(req.params.id, function(err, result) {
			if (err) return res.status(500).send(err);
				res.json(result);
			});
	},
	
	findAll: function(req, res){
		Projects.find(
			{})
			.limit(50)
			.populate('admins')
			.populate('messages.sentBy')
			.exec(
			function(err, result) {
				if (err) {
					return res.status(500).send(err)}
				else{
					res.json(result);
				}
			})
	},
	find: function(req, res){
		Projects.find(
			{'_id': req.params.id })
			.populate({
				path:'messages.sentBy admins members.member pendingApprovals',
				select:'basicInfo.firstName basicInfo.lastName'})
			.exec(
			function(err, result) {
				if (err) {
					return res.status(500).send(err)}
				else{
					res.json(result);
				}
			})
	},
	
	groupMessage: function(req, res){
		Projects.findByIdAndUpdate(req.body.project_id, 
		{$push:{messages:{
			message:req.body.message,
			sentBy:mongoose.Types.ObjectId(req.body.active_user_id)//may cause issues with req.user
		}}},
		{new: true},
		function(err, found){
			if (err) {return res.status(500).send(err)}
			else{
				Projects.findById(found._id)
				.populate({
					path:'messages.sentBy'
				})
				.exec(function(err, result) {
				if (err) {
					return res.status(500).send(err)}
				else{
					res.json(result);
				}
			})
			}
		})
	},

	
	projectUpdate: function(req, res) {
		Projects.findByIdAndUpdate(req.params.id, req.body, {new: true }, function(err, result) {
			if (err) return res.status(500).send(err);
			res.json(result);
		});
	},
	
	searchFor: function(req, res){
		Projects.find(
			{$or:[
			{'type': { "$regex": req.params.query, "$options": "i" }},
    		{'name': { "$regex": req.params.query, "$options": "i" }},
    		{'tags': { "$regex": req.params.query, "$options": "i" }}]}
		)
		.populate('admins')
		.exec(function(err, result) {
				if (err) {
					return res.status(500).send(err)}
				else{
					res.json(result);
				}
		})
	}
	
	
	
}


/***********************functions for project endpoints***************** */
function addProjectToUser(userId, project, message, res) {
	Users.findByIdAndUpdate(
	userId, 
	{$push:{pendingApprovals: project._id}}, 
	{multi:true},
	function(err, user) {
		if(err) return res.status(500).json(err);
		addMessageToUser(project, user, message, res)//go down
	}
	);
}

function sendMessageToAdmins(project, userId, message, res){
	var existingId = [];
	var index = 0;
	var id = mongoose.Types.ObjectId(userId);
	project.admins.forEach(function(elem){//for each admin in array
		Users.findById(elem, function(err, admin){		// go find admin's data	
			if (err) return res.status(500).send(err);

			else if (admin.messages.length > 0){		// if admin we found has messages
				admin.messages.forEach(function(elem){ //go through each meassage
					existingId.push(elem.withUser.toString())//push the fromId of each message to existingis

				})
				index = existingId.indexOf(userId) //index = the instance of active user in array
				if(index !== -1){

					admin.messages[index].messages.push({message:message, from: id })
					admin.save(function(err){
						if (err) return res.status(500).send(err)
					})
				}
				else {
					admin.messages.push(
						{
						messages:{message:message, from: id},
						withUser:id
						})
					admin.save(function(err){
						if (err) return res.status(500).send(err)
					})
				}
			}
			else {
					admin.messages.push(
						{
						messages:{message:message, from: id},
						withUser:id
						})
					admin.save(function(err){
						if (err) return res.status(500).send(err)
					})
				}
		})
	})
}

function save(obj, res){
	obj.save(function(err, succ){
		if (err) return res.status(500).send(err)
	})
}

function addMessageToUser (project, user, message,res){
	var existingMessages = [];
	var index = 0;
	
	if (user.messages.length > 0) {
			user.messages.forEach(function(obj){ //for each message =obj
				existingMessages.push(obj.withUser.toString())		 //push obj.fromUser to existing
			})
		project.admins.forEach(function(admin){// loop through the proects admins
			index = existingMessages.indexOf(admin.toString())//for each admin check and see if there is an admin id in existing messages
			if(index === -1){ //if not
				user.messages.push({withUser:admin, messages:{message:message, from:user._id}})
			}
			else{ //if there is
				user.messages[index].messages.push({message:message, from:user._id})
			}
		})
	}
	else {
		project.admins.forEach(function(admin){
			user.messages.push({withUser:admin, messages:{message:message, from:user._id}})
		})
	}
	user.save(function(err){
		if (err) return res.status(500).send(err)
	})
}

function addProjectToUserGroups(project, user, res){
	var id = mongoose.Types.ObjectId(project);
	Users.findByIdAndUpdate(user, 
		{$push:{groups:id }}, 
		{multi:true}, 
		function(err, result) {
			if (err) return res.status(500).send(err);
		})

};

function removeUserFromProject (user, project, res) {
	Projects.findById(project, function(err, project){
		if (err) return res.status(500).send(err);
		project.members.forEach(function(theUser){
			if (theUser.member.toString() === user){
				project.members.splice(user, 1)
				project.save(function(err){
		 			if (err) return res.status(500).send(err)
				})
			}
		})
	})
}

function removeProjectFromUser (user, project, res){
	Users.findById(user, function (err, user){
		if (err) return res.status(500).send(err);
		for (var pend in user.pendingApprovals){
			if (user.pendingApprovals[pend].toString() === project){
				user.pendingApprovals.splice(pend, 1)
				user.save(function(err){
		 			if (err) return res.status(500).send(err)
				})
			}
		}
	})
}

