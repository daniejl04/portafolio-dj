import { getLastUserId, getUsers, newUser } from "../apiConnection/API.js";


const formulario = document.querySelector('#formulario');
if (formulario) {
  formulario.addEventListener('submit', registerUser);
}

const formularioLogin = document.querySelector('#formularioLogin');
if (formularioLogin) {
  formularioLogin.addEventListener('submit', validateUser)
}

async function registerUser(e) {
  e.preventDefault();

  const nombre = document.querySelector("#nombre").value;
  const direccion = document.querySelector("#direccion").value;
  const contraseña = document.querySelector("#contraseña").value;
  const celular = document.querySelector("#celular").value;
  const correo = document.querySelector("#correo").value;
  const perfilDefecto = '../../img/avatar.png';

  // llamado de funcion para traer el ultimo ID
  const lastUserId = await getLastUserId();
  const newUserId = lastUserId + 1;

  const rolPerson = "usuario"

  const user = {
    id: newUserId,
    nombre,
    direccion,
    contraseña,
    celular,
    correo,
    imagen: perfilDefecto,
    rol: rolPerson
  }

  // Validar que no existan campos vacios
  if (
    nombre === "" ||
    direccion === "" ||
    contraseña === "" ||
    celular === "" ||
    correo === ""
  ) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hay un campo o mas vacio'
    });

    const nombre = document.querySelector("#nombre");
    const direccion = document.querySelector("#direccion");
    const contraseña = document.querySelector("#contraseña");
    const celular = document.querySelector("#celular");
    const correo = document.querySelector("#correo");

    nombre.value = ''
    direccion.value = ''
    contraseña.value = ''
    celular.value = ''
    correo.value = ''

    return;
  } else {
    Swal.fire({
      icon: "success",
      title: "El registro fue realizado con exito!",
      showConfirmButton: false,
      timer: 1500,
    });

    const date = setTimeout(function () {
      newUser(user)
    }, 1400);

    setTimeout(function () {
      window.location.href = "../html/login.html"
    }, 1500)

    return false;
  }

}

// Seccion de Login
async function validateUser(e) {
  e.preventDefault();

  const correoLogin = document.querySelector('#correoLogin').value
  const contraseñaLogin = document.querySelector('#contraseñaLogin').value

  if (correoLogin === '' || contraseñaLogin === '') {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hay un campo o mas vacios en el formulario de inicio de sesion'
    });
    return;
  }

  try {
    const users = await getUsers();
    const userFound = users.find(user => user.correo === correoLogin && user.contraseña === contraseñaLogin);


    if (userFound) {
      Swal.fire({
        icon: "success",
        title: "Inicio de sesion exitoso",
        showConfirmButton: false,
        timer: 1500,
      });

      // Guardado de id en el localStorage
      let setId = userFound.id
      localStorage.setItem('idUser', JSON.stringify(setId))
      // Guardado de nombre en el localStorage
      let setName = userFound.nombre
      localStorage.setItem('nameUser', JSON.stringify(setName))

       // Guardado de direcion en el localStorage
       let setAdress = userFound.direccion
       localStorage.setItem('adressUser', JSON.stringify(setAdress))

      if (userFound.rol === 'admin') {
        setTimeout(function () {
          window.location.href = "../html/admin.html";
        }, 1400);
      } else {
        setTimeout(function () {
          window.location.href = "../html/profile.html";
        }, 1400);
      }

    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Credenciales incorrectas. Intentalo de nuevo",
      });
    }

  } catch (error) {
    console.log(error);
  }

}

