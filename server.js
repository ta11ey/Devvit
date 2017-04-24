/// EXTERNAL MODULES //
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var moment = require('moment');


var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());

//controllers
var UserController = require('./controllers/userController');
var ProjectController = require('./controllers/projectController');
var MessageController = require('./controllers/messageController');


//ProjectController
app.get(        '/projects',      ProjectController.findAll);
app.get(        '/project/:id',    ProjectController.find);
app.get(        '/ptsearch/:query',ProjectController.searchFor);
app.post(       '/projects',       ProjectController.createProj);
app.put (       '/project/:id',    ProjectController.projectUpdate);
app.put(        '/projects',       ProjectController.apply);
app.delete(     '/project/:id',    ProjectController.destroy);
app.put(        '/accept',         ProjectController.accept);
app.put(        '/deny',           ProjectController.deny);
app.post(       '/groupmessage',   ProjectController.groupMessage);


//UserController
app.get(        '/user',                                      UserController.read);
app.post(       '/user',                                      UserController.create);
app.put(        '/user',                                      UserController.userUpdate);
app.delete(     '/user/:id',                                  UserController.destroy);
app.get(        '/active/:id',                                UserController.getActive);
app.get(        '/activeMessageInfo/:id',                     UserController.getActiveMessageInfo);
app.get(        '/activeMessages/:otherId/current/:activeId', UserController.getActiveUserMessages);
app.get(        '/getusers/:id',                              UserController.getUsers)

app.put(        '/newmessage',          MessageController.newMessage);
app.put(        '/addmessage',          MessageController.addMessage)

var mongoURI = 'mongodb://localhost:27017/devvit';
var port = 8080;

mongoose.set('debug', true);
mongoose.connect(mongoURI);
mongoose.connection.once('open', function() {
  console.log('Connected to Mongo DB at', mongoURI);
});

app.listen(port, function() {
  console.log('Listening on port '+ port);
});
