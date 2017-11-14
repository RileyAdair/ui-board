module.exports = {

  /*
  Home Endpoints ===============================================================
  */
  login: (req, res) => {
    const email = req.body.email;
    const db = req.app.get('db');
    db.get_users().then((users) => {
      const person = users.find(cur => cur.email == email);
      if(!person) {
        res.json({ validUser: 'no user'});
      }
      // if (person.password != password) {
      //   res.send({ validUser: 'incorrect password' });
      // }
      // req.session.user = person;
      res.json({ validUser: 'valid'})
    })
  },

  getUserId(req, res) {
    console.log(req.body);
    req.app
      .get('db')
      .get_user_id(req.body.email)
      .then(users => {console.log(users); res.json(users)})
      .catch(err => {console.log(err);res.json(err)});
  },

  checkUser: (req, res) => {
    const email = req.body.email;
    const db = req.app.get('db');
    db.get_users().then((users) => {
      const person = users.find(cur => cur.email == email);
      if(!person) {
        res.send({ validUser: 'create new user'});
      }
      res.send({ validUser: 'username already exists' });
    })
  },

  createUser(req, res) {
    req.app
      .get('db')
      .add_user(req.body)
      .then(users => res.json(users))
      .catch(err => res.json(err));
  },

  /*
  Directory Endpoints ==========================================================
  */
  getUser(req, res) {
    req.app
      .get('db')
      .get_user(req.params.id)
      .then(users => res.json(users))
      .catch(err => res.json(err));
  },

  getBoards(req, res) {
    req.app
      .get('db')
      .get_boards(req.params.id)
      .then(boards => res.json(boards))
      .catch(err => res.json(err));
  },

  getDirectoryImages(req, res) {
    req.app
      .get('db')
      .get_directory_images(req.params.id)
      .then(boards => res.json(boards))
      .catch(err => res.json(err));
  },

  checkBoard: (req, res) => {
    const name = req.body.name;
    const id = req.body.id;
    const db = req.app.get('db');
    db.get_boards([id]).then((boards) => {
      const board = boards.find(cur => cur.name == name);
      if(!board) {
        res.send({validBoard: 'create new board'});
      }
      res.send({validBoard: 'board already exists'});
    })
  },

  createBoard: (req, res) => {
    const name = req.body.name;
    const id = req.body.id;
    const db = req.app.get('db');
    db.add_board([ name, id ])
    .then(board => res.json(board))
    .catch(err => res.json(err));
  },

  deleteBoard: (req, res) => {
    req.app
      .get('db')
      .delete_board(req.body)
      .then(boards => res.json(boards))
      .catch(err => res.json(err));
  },

  /*
  Board Endpoints ==============================================================
  */
  getBoardName(req, res) {
    req.app
      .get('db')
      .get_board_name(req.body)
      .then(name => res.json(name))
      .catch(err => res.json(err));
  },

  getBoardImages(req, res) {
    req.app
      .get('db')
      .get_board_images(req.params.id)
      .then(images => res.json(images))
      .catch(err => res.json(err));
  },

  addImage(req, res) {
    req.app
      .get('db')
      .add_image(req.body)
      .then(image => res.json(image))
      .catch(err => res.json(err));
  },

  deleteImage(req, res) {
    req.app
      .get('db')
      .delete_image(req.body)
      .then(images => res.json(images))
      .catch(err => res.json(err));
  },

  addSite(req, res) {
    req.app
      .get('db')
      .add_site(req.body)
      .then(image => res.json(image))
      .catch(err => res.json(err));
  },

  updateBoardName(req, res) {
    req.app
      .get('db')
      .update_board_name(req.body)
      .then(image => res.json(image))
      .catch(err => res.json(err));
  },

  /*
  View Endpoints ===============================================================
  */
  getViewInfo(req, res) {
    req.app
      .get('db')
      .get_view_info(req.body)
      .then(name => res.json(name))
      .catch(err => res.json(err));
  },

  updateViewTitle(req, res) {
    req.app
      .get('db')
      .update_view_title(req.body)
      .then(image => res.json(image))
      .catch(err => res.json(err));
  },

  updateViewDescription(req, res) {
    req.app
      .get('db')
      .update_view_description(req.body)
      .then(image => res.json(image))
      .catch(err => res.json(err));
  },

  updateViewReference(req, res) {
    req.app
      .get('db')
      .update_view_reference(req.body)
      .then(image => res.json(image))
      .catch(err => res.json(err));
  }

}
