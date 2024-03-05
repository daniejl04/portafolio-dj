import { getSolicitud } from "../apiConnection/API.js";

// const toggler = document.querySelector(".btn");
// toggler.addEventListener("click",()=>{
//     document.querySelector("#sidebar").classList.toggle("collapsed");
// });
document.addEventListener("DOMContentLoaded", function() {
  
  const sidebarToggleBtn = document.querySelector(".navbar-toggler-icon");
  const sidebar = document.getElementById("sidebar");

  sidebarToggleBtn.addEventListener("click", function() {
      sidebar.classList.toggle("active");
  });

  // Aquí puedes agregar cualquier otra lógica JavaScript que necesites para tu página
  // Por ejemplo, cargar datos dinámicamente en la tabla, manejar clics en los elementos de la barra lateral, etc.
});

    //**********************API SOLICITUDES ************************//

    document.addEventListener('DOMContentLoaded', async () => {
      const solicitudes = await getSolicitud();
      inyectarContenido(solicitudes);

    })

  function inyectarContenido(solicitudes) {
    const tbody = document.querySelector(".tr");
    tbody.innerHTML = "";

    solicitudes.forEach( solicitud => {

      const {
        id,
        usuario,
        typeServicio,
        dateStart,
      } = solicitud;

      const fechaInicio =  dateStart.replace('T', ' Hora ')

      tbody.innerHTML += `
              <tr>
                  <th>${id}</th>
                  <td>${usuario}</td>
                  <td>${typeServicio}</td>
                  <td>${fechaInicio}</td>
                <!--<td></td>-->
                  <td><button type='button' class="btn btn-success btn-details" data-bs-target="#modalDetails" data-bs-toggle="modal" id="${id}">Details</button></td>
                  <td><button type='button' class="btn btn-secondary btn-accept text-white">Aceptar</button></td>
              </tr>
          `;
    });
  }
    //----------------------------- Función que se ejecutará cuando se haga clic en el botón ----------------------------//

    //const botonDetails = document.getElementsByClassName("btn-details")
    //const botonAccept = document.getElementsByClassName("btn-accept")
   // const modalDetails = document.querySelector('')
    const contentModal = document.querySelector(".modal-body")

    document.addEventListener("click", (event)=> {
    
      event.preventDefault()
      const id = event.target.getAttribute("id")

      if (event.target.classList.contains("btn-details")) {
        detallesSolicitud(id)
      }
      if (event.target.classList.contains("btn-accept")) {
        // aceptarSolicitud(id)
      }
    })

//  async function aceptarSolicitud() {
//   const infoSolicitudes = await getSolicitud()
//   infoSolicitudes.forEach(solicitud => {
//     if(Number(id) == solicitud.id ){      
//       const {
//         id,
//         usuario,
//         img,
//         typeServicio,
//         dateStart,
//       } = solicitud;

//       const fechaInicio =  dateStart.replace('T', ' Hora ')
//       //const fechaFinal =  dateEnd.replace('T', ' Hora ')

//     }
//     });
    
  // }
  async  function detallesSolicitud(id) {
    const infoSolicitudes = await getSolicitud()
      infoSolicitudes.forEach(solicitud => {
      if(Number(id) == solicitud.id ){
        
        const {
        usuario,
        img,
        typeServicio,
        marcas,
        referencia,
        dateStart,
        dateEnd,
        direccion,
        detalles} = solicitud

        const fechaInicio =  dateStart.replace('T', ' Hora ')
        const fechaFinal =  dateEnd.replace('T', ' Hora ')

        contentModal.innerHTML = `
        <table class="table">
  <thead>
    <tr>
      <th scope="col">Usuario</th>
      <th scope="col">Tipo de servicio</th>
      <th scope="col">Dirección</th>
    </tr>
  </thead>
  <tbody class="table">
    <tr>
      <td>${usuario}</td>
      <td>${typeServicio}</td>
      <td>${direccion}</td>
    </tr>
  <tr class="">
    <th>Fecha Disponible</th>
    <th>Fecha limite</th>
  </tr>
  <tr>
    <td>${fechaInicio}</td>
    <td>${fechaFinal}</td>
  </tr>
  <tr class="">
  <th>Detalles</th>
  </tr>
  <tr>
    <td>${detalles}</td>
  </tr>

  </tbody>
</table>`

      }
      });
      
    }




    //--------------------------------- Obtén el botón por su ID (EVENTOS) ---------------------------------------//




    

