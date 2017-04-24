var Projects = require('../models/projects')
var Users = require('../models/users')
var mongoose = require('mongoose')

module.exports = {
	newMessage: function(req, res){
		sendMessageToActiveUser(req, res);
		sendMessageToUser(req,res)
		res.send('message sent')
	},
	
	addMessage: function (req, res){
		addMessageToActiveUser(req, res);
		addMessageToUser(req, res);
		res.send('message added')
	}
	
}

function sendMessageToActiveUser(req, res){
	Users.findByIdAndUpdate(req.body.active_user_id, 
	{$push:{
		messages:{
			messages:{
				message:req.body.message,
				from: req.body.active_user_id
			},
			withUser: req.body.toUser,		
		}
	}},
	function (err){
		if (err) return res.status(500).send(err);
	})
}

function sendMessageToUser(req, res){
	Users.findByIdAndUpdate(req.body.toUser, 
	{$push:{
		messages:{
			messages:{
				message:req.body.message,
				from: req.body.active_user_id
			},
			withUser: req.body.active_user_id,		
		}
	}},
	function (err){
		if (err) return res.status(500).send(err);
	})
}

function addMessageToActiveUser(req, res){
	Users.findById(req.body.active_user_id,
	function(err, user){
		if (err) return res.status(500).send(err)
		var existingMessages = [];
		user.messages.forEach(function(message){
			existingMessages.push(message.withUser.toString())		
		})
		var index = existingMessages.indexOf(req.body.toUser);
		if (index === -1){
			res.status(500)
		}
		else{
			user.messages[index].messages.push({
				message:req.body.message,
				from: req.body.active_user_id
			})
			user.save(function(err, msg) {
					if (err) return res.status(500).send(err);	
				});		
		}
	})
}

function addMessageToUser(req, res){
	Users.findById(req.body.toUser,
	function(err, user){
		if (err) return res.status(500).send(err)
		var existingMessages = [];
		user.messages.forEach(function(message){
			existingMessages.push(message.withUser.toString())		
		})
		var index = existingMessages.indexOf(req.body.active_user_id);
		if (index === -1){
			res.status(500)
		}
		else{
			user.messages[index].messages.push({
				message:req.body.message,
				from: req.body.active_user_id
			})
			user.save(function(err) {
					if (err) return res.status(500).send(err);	
				});		
		}
	})
}



