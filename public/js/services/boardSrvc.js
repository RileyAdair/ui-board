app.service('boardSrvc',function($http, $location, $sce){

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
        this.user = user
        return user
    }
  })

  /*
  Get requests on view load ====================================================
  */
  this.getBoardName = (id) => {
    // Endpoint - get board name
    return $http.post('/user/getBoardName', [ id ]);
  }

  // $sce
  this.getBoardImages = (board) => {
    // Endpoint - get board images
    return $http.get(`/user/getBoardImages/${board.board_id}`)
    .then(response => {
      const results = response.data;
      const imagesArr = [];

      for(var i = 0; i < results.length; i++){
        const obj = {
          board_id: results[i].board_id,
          image_url: $sce.trustAsResourceUrl(results[i].image_url),
          site_url: $sce.trustAsResourceUrl(results[i].site_url),
          reference_url: results[i].reference_url,
          title: results[i].title,
          description: results[i].description,
          image_id: results[i].image_id
        }
        imagesArr.push(obj);
      }
      return imagesArr;

    })
  }

  /*
    Upload image to Firebase ==================================================
    Add & delete site
  */
  this.upload = (file) => {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child('images/' + file.name).put(file);
    return new Promise(function(resolve, reject) {

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            break;
        }
      },

      function(error) {
        // Handle unsuccessful uploads
        reject(error);
      },
      function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        const downloadURL = uploadTask.snapshot.downloadURL;
        const boardId = file.id;
        const name = file.name
        file.title = name.replace(/.([^.]*)$/,'');
        const title = file.title.charAt(0).toUpperCase() + file.title.slice(1);
        // pass download url to database
        resolve({downloadURL, boardId, title});
      });

    })
    .then(({downloadURL, boardId, title}) => {
      // const {downloadURL, boardId} = obj
      // Endpoint - add image
      return $http.post('/user/addImage', [ downloadURL, boardId, title ])
      .then(response => {
        const results = response.data[0];

        const obj = {
          board_id: results.board_id,
          image_url: $sce.trustAsResourceUrl(results.image_url),
          site_url: $sce.trustAsResourceUrl(results.site_url),
          reference_url: results.reference_url,
          title: results.title,
          description: results.description,
          image_id: results.image_id
        }

        return obj;
      })
    })
  }

  this.deleteImage = (imageId, boardId) => {
    return $http.post('/user/deleteImage', [ imageId, boardId ])
  }

  /*
  Add & delete site ============================================================
  */
  this.addSite = (site, boardId) => {

    let title = site.replace(/(^\w+:|^)\/\//, '')
    title = title.replace(/.([^.]*)$/,'')
    title = title.replace(/(?:www.)/,'');
    title = title.charAt(0).toUpperCase() + title.slice(1)

    return $http.post('/user/addsite', [ site, boardId, title ])
    .then(response => {
      const results = response.data[0];

      const obj = {
        board_id: results.board_id,
        image_url: $sce.trustAsResourceUrl(results.image_url),
        site_url: $sce.trustAsResourceUrl(results.site_url),
        reference_url: results.reference_url,
        title: results.title,
        description: results.description,
        image_id: results.image_id
      }

      return obj;
    })

  }

  /*
  Update board name ============================================================
  */
  this.updateBoardName = (name, boardId) => {
    // Endpoint - update board name
    return $http.post('/user/updateBoardName', [ name, boardId ])
  }


})
