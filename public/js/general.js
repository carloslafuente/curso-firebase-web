$(() => {
  $('.tooltipped').tooltip({ delay: 50 });
  $('.modal').modal();

  // TODO: Adicionar el service worker

  // Init Firebase nuevamente
  firebase.initializeApp(config);

  // TODO: Registrar LLave publica de messaging

  // TODO: Solicitar permisos para las notificaciones

  // TODO: Recibir las notificaciones cuando el usuario esta foreground

  // TODO: Recibir las notificaciones cuando el usuario esta background

  // TODO: Listening real time
  const posts = new Post();
  posts.consultarTodosPost();

  // TODO: Firebase observador del cambio de estado

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#btnInicioSesion').text('Salir');
      if (user.photoURL) {
        $('#avatar').attr('src', user.photoURL);
      } else {
        $('#avatar').attr('src', 'imagenes/usuario_auth.png');
      }
    } else {
      $('#btnInicioSesion').text('Iniciar Sesión');
      $('#avatar').attr('src', 'imagenes/usuario.png');
    }
  });

  // TODO: Evento boton inicio sesion
  $('#btnInicioSesion').click(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      $('#btnInicioSesion').text('Iniciar Sesion');
      return firebase
        .auth()
        .signOut()
        .then(() => {
          $('#avatar').attr('src', 'imagenes/usuario.png');
          Materialize.toast(`Signout realizado correctamente`, 4000);
        })
        .catch((error) => {
          Materialize.toast(`Error al realizar SignOut => ${error}`, 4000);
        });
    }
    $('#emailSesion').val('');
    $('#passwordSesion').val('');
    $('#modalSesion').modal('open');
  });

  $('#avatar').click(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        $('#avatar').attr('src', 'imagenes/usuario.png');
        Materialize.toast(`SignOut correcto`, 4000);
      })
      .catch((error) => {
        Materialize.toast(`Error al realizar signout: ${error.message}`, 4000);
      });
  });

  $('#btnTodoPost').click(() => {
    $('#tituloPost').text('Posts de la Comunidad');
    const posts = new Post();
    posts.consultarTodosPost();
  });

  $('#btnMisPost').click(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      const posts = new Post();
      posts.consultarPostxUsuario(user.email);
      $('#tituloPost').text('Mis Posts');
    } else {
      Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000);
    }
  });
});
