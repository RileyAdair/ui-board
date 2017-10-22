const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
// Session - const session = require('express-session');
const massive = require('massive');
const port = 3000;
const app = express();
const ctrl = require('./server/ctrl.js');
// Session - const { secret, dbUser, database } = require('./server/config');
const { dbUser, database } = require('./server/config');
// Database connection information
const connectionString = `postgres://${dbUser}@localhost/${database}`;
// const connectionString = "postgres://lyqkwtvsnrrqyf:acd804d40b1368b5dbfbf97a607ae16580d26e68bf6a61c5a152b91a7b3cef25@ec2-54-163-245-14.compute-1.amazonaws.com:5432/d1k08g3kh90mfi?ssl=true";

// connecting to our DB with massive
massive(connectionString).then(db => {
  app.set('db', db);
});

// required middlewares
app.use(json());
app.use(cors());
app.use('/', express.static(__dirname + '/public'));


// Session -
// app.use(session({
//   secret,
//   resave: true,
//   saveUninitialized: true
// }))
// if not logged in, send error message and catch in resolve
// else send user
// app.get('/auth/me', (req, res) => {
//     if (!req.session.user) return res.status(401).json({err: 'User Not Authenticated'});
//     res.status(200).json(req.session.user);
// });

/*
Endpoints ======================================================================
*/
// Home Endpoints
app.post('/user/login', ctrl.login);
app.get('/user/getUserId/:id', ctrl.getUserId);
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
