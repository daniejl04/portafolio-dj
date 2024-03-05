 // SECCION FOR MODAL
import {servicios} from "../js/obj.js"
import { newSolicitud, getLastSolicitudId } from "../apiConnection/API.js"

const typeServicio = document.querySelector('#typeServicio')
const marcas = document.querySelector('#marcas')
const referencia = document.querySelector('#referenceElectro')
const dateStart = document.querySelector('#startAvailability')
const dateEnd = document.querySelector('#endAvailability')
const img = document.querySelector('#formFileMultiple')
const detalles = document.querySelector('#detalles')
const cardService = document.querySelector('.containerCards')
const description = document.querySelector('.description')
const titleModal = document.querySelector('.modal-title')



cardService.addEventListener('click', selectCard)
function selectCard(selectId) {

  if(selectId.target.classList.contains("btnModal")){

       let idModal = selectId.target.getAttribute("id")

     insertarInfo(idModal)
  }
}

function insertarInfo(idModal) {
     
   servicios.forEach( servicio => {
       if (idModal == servicio.id) {
        servicio.insertInput()
        titleModal.innerHTML = `${servicio.titulo}`
        description.innerHTML = `${servicio.caracteristica}`
       }
  });
  
}

let infoModal = {
  id: 0,
  usuario:"",
  typeServicio:"",
  marcas:"",
  referencia:"",
  dateStart:"",
  dateEnd:"",
  img:"",
  direccion:"",
  detalles:""
}

const btnEnviar = document.querySelector('#enviar')
btnEnviar.addEventListener('click', enviarModal)

async function enviarModal() {

  //obtenemos el nombre del localStorage
  const userName = localStorage.getItem('nameUser')
  const userNameParse = JSON.parse(userName)

    //obtenemos el nombre del localStorage
    const userAdress = localStorage.getItem('adressUser')
    const userAdressParse = JSON.parse(userAdress)
console.log(userAdressParse)


const userNull = null

if(userNameParse === userNull ){

  Swal.fire({
    icon: 'warning',
    title: 'Advertencia',
    text: 'debes iniciar sesion para hacer tu solicitud'
  });
  return; 
}

Swal.fire({
  icon: "success",
  title: "Tu solicitud se envió con éxito",
  showConfirmButton: false,
  timer: 3000,
});

    infoModal.usuario = userNameParse
    infoModal.typeServicio = typeServicio.value
    infoModal.marcas = marcas.value
    infoModal.referencia = referencia.value
    infoModal.dateStart = dateStart.value
    infoModal.dateEnd = dateEnd.value
    infoModal.img = img.value
    infoModal.direccion = userAdressParse
    infoModal.detalles = detalles.value

  if(infoModal){
    const lastSolicitudId = await getLastSolicitudId()
    const newSolicitudId = lastSolicitudId + 1
    infoModal.id = newSolicitudId

    console.log(infoModal.id)
  } 

  newSolicitud(infoModal)

}


// class Empresas {
//     constructor(direccion, ciudad, telefono, razonSocial, nit, email, rpLegal, propiedad, empleados, tipo){
//         this.direccion = direccion;
//         this.ciudad = ciudad;
//         this.telefono = telefono;
//         this.razonSocial = razonSocial;
//         this.nit = nit;
//         this.email = email;
//         this.rpLegal = rpLegal;
//         this.propiedad = propiedad;
//         this.empleados = empleados;
//         this.tipo = tipo;
//     }

//     recibir(){}
//     revisar(){}
//     aceptar(){}
//     rechazar(){}
//     agendar(){}
//     realizar(){}
// }


// // Instanciar la clase - Objeto
// const tecniLavadoras = new Empresas("Cr 19A #33B", "Bogota", 3218780291, "Tecni Lavadoras", 123456789, "tecnilavadoras@gmail.com", "Pedro", "Publica", 34, "Mediana");
// const tecnoExpress = new Empresas("Cr 22A #22B", "Medellin", 3218480232, "Tecno Express", 123456789, "tecnoexpress@gmail.com", "Julian", "Privada", 45, "Grande");                                                  
// const serviTubos = new Empresas("Cr 45C #32B", "Cali", 3245678941, "Servi Tubos", 123456789, "servitubos@gmail.com", "Carlos", "Publica", 10, "Pequeña");
// const jhElectrodomesticos = new Empresas("Cr 11A #4B", "Pereira", 3101374873, "jhElectrodomesticos", 123456789, "jhelectrodomesticos@gmail.com", "Pablo", "Privada", 25, "Mediana");
// const serviConfort = new Empresas("Cr 34A #89B", "Manizales", 3145789452, "serviConfort", 123456789, "serviconfort1@gmail.com", "Martha", "Publica", 55, "Grande");
// const hogarPerfecto = new Empresas("Cr 12C #91B", "Cali", 3124677414, "Hogar Perfecto", 123456789, "hogarperfecto33@gmail.com", "Daniel", "Privada", 14, "Pequeña");
// const serviSoluciones = new Empresas("Cr 45A #41C", "Armenia", 3144687414, "Servi Soluciones", 123456789, "servisoluciones4@gmail.com", "Alex", "Publica", 44, "Mediana");
// const aquiLoArreglamos = new Empresas("Cr 14B #12A", "Neiva", 3144557413, "Aqui lo Arreglamos", 123456789, "aquiloarreglamos32@gmail.com", "Juliana", "Privada", 66, "Grande");
// const todoEnCasa = new Empresas("Cr 45A #33A", "Popayan", 3141357413, "Todo en Casa", 123456789, "todoencasa1@gmail.com", "Vermen", "Publica", 102, "Grande");
// const carpinterosALaObra = new Empresas("Cr 22D #33C", "Ibague", 3141147422, "Carpinteros a la obra", 123456789, "carpin_obra@gmail.com", "Alejandro", "Privada", 102, "Mediana");

// class Clientes {
//     constructor(nombre, direccion, contraseña, celular, email, servicio, id){
//         this.nombre = nombre;
//         this.direccion = direccion;
//         this.contraseña = contraseña;
//         this.celular = celular;
//         this.email = email;
//         this.servicio = servicio;
//         this.id = id;
//     }

//     registrar(){}
//     solicitar(){}
//     contactar(){}
//     eliminar(){}
//     modificar(){}
// }


// // Instanciar la clase - Objeto
// const nuevo = new Clientes("Pedro", "Cr 29B #22A", "pedro-44", 3238784751, "pedro@gmail.com", "plomeria", 1);
// const antiguo = new Clientes("Carlos", "Cr 12A #33B", "carlitos2$a", 3348784751, "carlos@gmail.com", "reparacion", 2);
// const interesado = new Clientes("Juliana", "Cr 8B #24A", "jlna_41", 3344714751, "juli22@gmail.com", "limpieza", 3);
// const vetado = new Clientes("Ingrid", "Cr 44A #66E", "lopez_2$", 31725178414, "ingridl47@gmail.com", "cuidado", 4);
// const extranjero = new Clientes("Darek", "Cr 11A #78B", "dark2_2", 3218780291, "darekamstrong4@gmail.com", "limpieza", 5);

// const compañia = new Clientes("Valeria", "Cr 74A #12B", "leriav78_1", 3212918740, "valeria@gmail.com", "limpieza", 6);
// const potencial = new Clientes("Nicolas", "Cr 1A #66E", "nico_47", 3245789120, "nicoluna24@gmail.com", "plomeria", 7);
// const perdidos = new Clientes("Maicol", "Cr 47C #45E", "asp_41", 3247895120, "maicolPd@gmail.com", "cuidado", 8);
// const vip = new Clientes("Marlen", "Cr 11G #77F", "", 3247895120, "marlen22@outlook.com", "reparacion", 9);
// const inactivo = new Clientes("Manuela", "Cr #4F #22E", "", 3247895120, "manu2003@gmail.com", "plomeria", 10);
