import { getComments, getLastCommentId, newComment } from "../apiConnection/API.js";

const formularioC = document.querySelector('#formularioComentarios');
formularioC.addEventListener('submit', createComment);

document.addEventListener("DOMContentLoaded", async () => {
    await mostrarComentarios();
});

async function mostrarComentarios() {
    const containerComments = document.querySelector('#containerComments')
    const comments = await getComments();

    containerComments.innerHTML = '';

    comments.forEach((comment) => {
        const { id, fecha, usuario, comentario } = comment;

        containerComments.innerHTML += `
            <div id="${id}" class="comment mt-4 text-justify">
                <img src="../img/avatar.png" alt="" class="rounded-circle" width="40" height="40">
                <h4>${usuario}</h4>
                <span>${fecha}</span>
                <br>
                <p>${comentario}</p>
            </div>
        `;
    });
}


async function createComment(e) {
    e.preventDefault();

    const comentario = document.querySelector('#textArea').value
    const lastCommentId = await getLastCommentId();
    const newCommentId = lastCommentId + 1;

    const fecha = new Date();
    const añoActual = fecha.getFullYear();
    const dia = fecha.getDate();
    const mesActual = fecha.getMonth() + 1; 

    const fechaC = dia+"/"+mesActual+"/"+añoActual;

    const nameUser = localStorage.getItem('nameUser')
    const parseName = JSON.parse(nameUser)

    const comment = {
        id: newCommentId,
        fecha: fechaC,
        usuario: parseName,
        comentario
    }

    if (comentario === "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Comentario vacio'
        })
        
        return;
    } else {
        Swal.fire({
            icon: "success",
            title: "El registro fue realizado con exito!",
            showConfirmButton: false,
            timer: 1500,
          });

          const textArea = document.querySelector('#textArea')
          textArea.value = "" 

          setTimeout(function() {
            newComment(comment)
          }, 1500);

          return false;
    }
}