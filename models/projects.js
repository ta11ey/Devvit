var mongoose = require('mongoose');

var ProjectsSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	type: { type: String, required: true },
	subType: String,
	admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
	members: [{
			application: {
				pending: { type: Boolean, default: true },
				message: { type: String }
			},
			member: {type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
		}],
	messages: [{ 
		message:{type:String},
		time:{type:Date, default:Date.now},
		sentBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
	 }],
	activeWeb: Boolean,
	activeMobile: Boolean,
	createdAt: {type: Date, default:Date.now },
	tags:[{type:String}]

})

module.exports = mongoose.model('Projects', ProjectsSchema)
