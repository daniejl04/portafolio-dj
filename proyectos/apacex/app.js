// try catch


// console.log(4);

// try {
//     imprimir()

// } catch (error) {
    
// }
// console.log(5)


// const Url = "https://www.themealdb.com/api/json/v1/1/categories.php"

// document.addEventListener("DOMContentLoaded", getData)

// fetch basico de api


// function getData() {
//     fetch(Url)
//     .then(result => result.json())
//     .then(resul => console.log(resul.categories))
// }

// async function getData() {

//     try {
//         const response = await fetch(Url);
//         const datos = await response.json()
//         console.log(datos.categories) 
        
//     } catch (error) {
//         console.log('Error')
//     }
// }


const content = document.querySelector('.content')
//const modal = document.createElement('div')


const apiSpacex = "https://api.spacexdata.com/v3/launches"

try {

  document.addEventListener('DOMContentLoaded', getData)

    // funcion asincronica para obtener los datos de la api

    async function getData() {
        const resultado = await fetch(apiSpacex)
        const datos = await resultado.json()
        createCard(datos)
       console.log(datos);
    }

} catch (error) {
    console.log('mal');
}


function createCard(dato) {
  
  dato.forEach(element => {
    const img = element.links.mission_patch
    const nameMision = element.mission_name
    const  age = element.launch_year
    const {flight_number} = element

//console.log(flight_number)

    content.innerHTML += `
    <div class="card" style="width: 18rem;">
    <img src="${img}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${nameMision}</h5>
      <p class="card-text">${age}</p>
      <button type="button" class="btn btn-primary btnModal" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="btnModal" numvuelo="${flight_number}">ensayo</button>
    </div>
  </div>`

  //content.appendChild(content)


})
}

let infoModal = []

// se obtiene el valor del atributo de cada id del cada boton de las card creadas y se hace un callback para sacar el dato y utilzarlo en 
// una siguiente funcion para concatenar la url de la api con el numero del vuelo para obtener de alli los datos precisos de la api justo en el momento que se haga click en el boton

//const btn = document.querySelector('.btn')

content.addEventListener('click', selectCard)

 function selectCard(e) {

  if(e.target.classList.contains("btn")){

    let idModal = e.target.getAttribute("numvuelo")

    //console.log(idModal)
    datoModal(idModal)
  }

}

async function datoModal(idModal) {

  const url2 = `https://api.spacexdata.com/v3/launches/${idModal}`

  try {
    const resp = await fetch(url2)
    const datosModal = await resp.json();

    console.log(datosModal)

    infoModal = [datosModal]

    llenarModal(datosModal)

    console.log(infoModal)

  } catch (error) {
    console.log("error")
  }

}

const contenidoModal = document.querySelector('.modal-body')

function llenarModal(datosModal) {

const {youtube_id} = datosModal.links
const {rocket_name, rocket_type} = datosModal.rocket
const {launch_success} = datosModal

contenidoModal.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${youtube_id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`

}
