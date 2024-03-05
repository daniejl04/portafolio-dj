import { getUserById, updateUser } from "../apiConnection/API.js";

// SECCION DE PERFIL
const nombrePerfil = document.querySelector('#nombrePerfil');
const direccionPerfil = document.querySelector('#direccionPerfil');
const contraseñaPerfil = document.querySelector('#contraseñaPerfil');
const telefonoPerfil = document.querySelector('#telefonoPerfil');
const correoPerfil = document.querySelector('#correoPerfil');

const btnLogout = document.querySelector('#btnLogout');
btnLogout.addEventListener('click', ()=> {
  Swal.fire({
    title: "Estas seguro?",
    text: "No podrás revertirlo",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, deseo cerrar!",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Cerrada",
        text: "Sesión cerrada con exito!",
        icon: "success",
        showConfirmButton: false
      });

      localStorage.clear()

      setTimeout(function () {
        window.location.href = '../index.html'
      }, 1400)
    }
  });
})

const formulario = document.querySelector('#registrationForm');
formulario.addEventListener('submit', updateInfo);

const imgPerfil = document.querySelector('#imgPerfil');
const fileImage = document.querySelector('#fileImage');

fileImage.addEventListener('change', cargarImagen);

// Asignar datos segun info guardada
document.addEventListener("DOMContentLoaded", async () => {
  await mostrarInformacion();
});

const mostrarContraseña = document.querySelector('#check');


mostrarContraseña.addEventListener('click', () => {
  if (contraseñaPerfil.type === "password") {
    contraseñaPerfil.type = "text"
  } else {
    contraseñaPerfil.type = "password"
  }
})

async function mostrarInformacion() {

  try {

    const userIdLogin = localStorage.getItem('idUser');
    const user = await getUserById(JSON.parse(userIdLogin));

    user.forEach((dataUser) => {
      nombrePerfil.placeholder = dataUser.nombre;
      direccionPerfil.placeholder = dataUser.direccion;
      contraseñaPerfil.value = dataUser.contraseña;
      telefonoPerfil.placeholder = dataUser.celular;
      correoPerfil.placeholder = dataUser.correo;

      imgPerfil.src = dataUser.imagen


    });

  } catch (error) {
    console.log(error);
  }
}

const defaultImg = '../img/avatar.png';


function cargarImagen(e) {

  if (e.target.files[0]) {
    const reader = new FileReader()
    reader.onload = function (e) {
      imgPerfil.src = e.target.result;
      localStorage.setItem('imagen', JSON.stringify(e.target.result))
    }
    reader.readAsDataURL(e.target.files[0])

  } else {
    imgPerfil.src = defaultImg;
  }
}



async function updateInfo(e) {
  e.preventDefault();

  const userId = localStorage.getItem('idUser');
  const parseoId = JSON.parse(userId)

  const nombre = document.querySelector('#nombrePerfil').value
  const direccion = document.querySelector('#direccionPerfil').value
  const contraseña = document.querySelector('#contraseñaPerfil').value
  const celular = document.querySelector('#telefonoPerfil').value
  const correo = document.querySelector('#correoPerfil').value

  const imagen = fileImage.value;
  const dataUser = {};

  // traer datos
  const userIdLogin = localStorage.getItem('idUser');
  const users = await getUserById(JSON.parse(userIdLogin));

  const url = localStorage.getItem('imagen');
  const convert = JSON.parse(url)

  users.forEach((user) => {
    if (nombre !== '') {
      dataUser.nombre = nombre;
      dataUser.direccion = user.direccion;
      dataUser.contraseña = user.contraseña;
      dataUser.celular = user.celular;
      dataUser.correo = user.correo;
      dataUser.imagen = user.imagen;
      dataUser.rol = user.rol

      document.querySelector('#nombrePerfil').value = '';
    }
    if (direccion !== '') {
      dataUser.nombre = user.nombre;
      dataUser.direccion = direccion;
      dataUser.contraseña = user.contraseña;
      dataUser.celular = user.celular;
      dataUser.correo = user.correo;
      dataUser.imagen = user.imagen;
      dataUser.rol = user.rol


      document.querySelector('#direccionPerfil').value = '';
    }
    if (contraseña !== '') {
      dataUser.nombre = user.nombre;
      dataUser.direccion = user.direccion;
      dataUser.contraseña = contraseña;
      dataUser.celular = user.celular;
      dataUser.correo = user.correo;
      dataUser.imagen = user.imagen;
      dataUser.rol = user.rol

      document.querySelector('#contraseñaPerfil').value = '';
    }
    if (celular !== '') {
      dataUser.nombre = user.nombre;
      dataUser.direccion = user.direccion;
      dataUser.contraseña = user.contraseña;
      dataUser.celular = celular;
      dataUser.correo = user.correo;
      dataUser.imagen = user.imagen;
      dataUser.rol = user.rol

      document.querySelector('#telefonoPerfil').value = '';
    }
    if (correo !== '') {
      dataUser.nombre = user.nombre;
      dataUser.direccion = user.direccion;
      dataUser.contraseña = user.contraseña;
      dataUser.celular = user.celular;
      dataUser.correo = correo;
      dataUser.imagen = user.imagen;
      dataUser.rol = user.rol
      document.querySelector('#correoPerfil').value = '';
    }
    if (imagen !== '') {
      dataUser.nombre = user.nombre;
      dataUser.direccion = user.direccion;
      dataUser.contraseña = user.contraseña;
      dataUser.celular = user.celular;
      dataUser.correo = user.correo;
      dataUser.imagen = convert; 
      dataUser.rol = user.rol
      document.querySelector('#fileImage').value = '';
    }
  });

  if (Object.keys(dataUser).length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Advertencia',
      text: 'No has realizado cambios para actualizar'
    });
    return;
  }

  Swal.fire({
    icon: "success",
    title: "Actualzado con exito",
    showConfirmButton: false,
    timer: 1500,
  });

  setTimeout(function () {
    updateUser(parseoId, dataUser);
  }, 1400)

  return false;
}
