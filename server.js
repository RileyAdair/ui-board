require("dotenv").config()
const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const app = express();
const ctrl = require('./server/ctrl.js');
const { dbUser, database } = require('./server/config');
// Database connection information
// const connectionString = `postgres://${dbUser}@localhost/${database}`;

const { port, connectionString } = require('./config')
// connecting to our DB with massive
massive(connectionString).then(db => {
  app.set('db', db);
});

// required middlewares
app.use(json());
app.use(cors());
app.use('/', express.static(__dirname + '/public'));

// Home Endpoints
app.post('/user/login', ctrl.login);
app.post('/user/getUserId', ctrl.getUserId);
app.post('/user/checkUser', ctrl.checkUser);
app.post('/user/createUser', ctrl.createUser);
// Directory Endpoints
app.get('/user/getUser/:id', ctrl.getUser);
app.get('/user/getBoards/:id', ctrl.getBoards);
app.get('/user/getDirectoryImages/:id', ctrl.getDirectoryImages);
app.post('/user/checkBoard', ctrl.checkBoard);
app.post('/user/createBoard', ctrl.createBoard);
app.post('/user/deleteBoard', ctrl.deleteBoard);
// Board Endpoints
app.post('/user/getBoardName', ctrl.getBoardName);
app.get('/user/getBoardImages/:id', ctrl.getBoardImages);
app.post('/user/addImage', ctrl.addImage);
app.post('/user/deleteImage', ctrl.deleteImage);
app.post('/user/addsite', ctrl.addSite);
app.post('/user/updateBoardName', ctrl.updateBoardName);
// View Endpoints
app.post('/user/getViewInfo', ctrl.getViewInfo);
app.post('/user/updateViewTitle', ctrl.updateViewTitle);
app.post('/user/updateViewDescription', ctrl.updateViewDescription)
app.post('/user/updateViewReference', ctrl.updateViewReference)

app.listen(port, function() {
  console.log('Server listening on port', port);
})
