$(() => {
  $('#btnModalPost').click(() => {
    $('#tituloNewPost').val('');
    $('#descripcionNewPost').val('');
    $('#linkVideoNewPost').val('');
    $('#btnUploadFile').val('');
    $('.determinate').attr('style', `width: 0%`);
    sessionStorage.setItem('imgNewPost', null);

    // TODO: Validar que el usuario esta autenticado

    // Materialize.toast(`Para crear el post debes estar autenticado`, 4000)

    $('#modalPost').modal('open');
  });

  function parseVideoURL(urlVideo) {
    let url = urlVideo;
    let newUrl = '';
    if (url.includes('watch?v=')) {
      newUrl = url.replace('watch?v=', 'embed/');
    }
    if (url.includes('watch/')) {
      newUrl = url.replace('watch/', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      newUrl = url.replace('youtu.be/', 'www.youtube.com/embed/');
    }
    return newUrl;
  }

  $('#btnRegistroPost').click(() => {
    const post = new Post();
    const user = firebase.auth().currentUser;
    // TODO: Validar que el usuario esta autenticado
    if (user == null) {
      Materialize.toast(`Para crear el post debes estar autenticado`, 4000);
      return;
    }

    const titulo = $('#tituloNewPost').val();
    const descripcion = $('#descripcionNewPost').val();
    const videoLink = parseVideoURL($('#linkVideoNewPost').val());
    const imagenLink =
      sessionStorage.getItem('imgNewPost') == 'null'
        ? null
        : sessionStorage.getItem('imgNewPost');

    post
      .crearPost(
        user.uid,
        user.email,
        titulo,
        descripcion,
        imagenLink,
        videoLink
      )
      .then((resp) => {
        Materialize.toast(`Post creado correctamente`, 4000);
        $('.modal').modal('close');
      })
      .catch((err) => {
        Materialize.toast(`Error => ${err}`, 4000);
      });
  });

  $('#btnUploadFile').on('change', (e) => {
    // TODO: Validar que el usuario esta autenticado

    // Materialize.toast(`Para crear el post debes estar autenticado`, 4000)

    const file = e.target.files[0];

    // TODO: Referencia al storage
  });
});
