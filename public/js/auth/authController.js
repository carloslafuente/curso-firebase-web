$(() => {
  const objAuth = new Autenticacion();

  $('#btnRegistroEmail').click(() => {
    console.log('AQUI');
    const nombres = $('#nombreContactoReg').val();
    const email = $('#emailContactoReg').val();
    const password = $('#passwordReg').val();
    // TODO : LLamar crear cuenta con email
    const auth = new Autenticacion();
    auth.crearCuentaEmailPass(email, password, nombres);
  });

  $('#btnInicioEmail').click(() => {
    const email = $('#emailSesion').val();
    const password = $('#passwordSesion').val();
    // TODO : LLamar auth cuenta con email
    const auth = new Autenticacion();
    auth.authEmailPass(email, password);
  });

  $('#btnResetPassword').click(() => {
    const email = $('#emailSesion').val();
    const auth = new Autenticacion();
    auth.reestablecerPass(email);
  });

  $('#authGoogle').click(() => objAuth.authCuentaGoogle());

  $('#authFB').click(() => objAuth.authCuentaFacebook());

  //$("#authTwitter").click(() => //AUTH con Twitter);

  $('#btnRegistrarse').click(() => {
    $('#modalSesion').modal('close');
    $('#modalRegistro').modal('open');
  });

  $('#btnIniciarSesion').click(() => {
    $('#modalRegistro').modal('close');
    $('#modalSesion').modal('open');
  });
});
