const URL = "http://localhost:4000/users";

// POST - USER
export const newUser = async user => {
    try {
        await fetch(URL, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log(error);
    }
};

// PUT - USER
export const updateUser = async (userId, updateUser) => {
    try {
        await fetch(`http://localhost:4000/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(updateUser),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log(error);
    }
};

// Implementacion para obtener el ultimo ID
export const getLastUserId = async () => {
    try {
        const response = await fetch(URL);
        const users = await response.json();

        if (users.length > 0) {
            const lastUser = users[users.length - 1];
            return parseInt(lastUser.id);
        } else {
            return 0;
        }

    } catch (error) {
        console.log(error);
        return 0;
    }
}

// POST - USER
export const loginUser = async (userLogin) => {
    try {
        const response = await fetch(URL, {
            method: 'POST',
            body: JSON.stringify(userLogin),
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.log(error);
    }
}

// GET - USERS
export const getUsers = async () => {
    try {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.json();
        
    } catch (error) {
        console.log(error);
    }
}

// GET - USER
export const getUserById = async userId => {
    try {
        const response = await fetch(`http://localhost:4000/users?id=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.json();
    } catch (error) {
        console.log(error);
    }
}

/******** SECION DE COMENTARIOS ***********/
const urlComentarios = "http://localhost:4000/comments";

// POST - COMMENT
export const newComment = async data => {
    try {
        const res = await fetch(urlComentarios, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log(error);
    }
};

// Implementacion para obtener el ultimo ID comentario
export const getLastCommentId = async () => {
    try {
        const response = await fetch(urlComentarios);
        const comments = await response.json();

        if (comments.length > 0) {
            const lastComment = comments[comments.length - 1];
            return parseInt(lastComment.id);
        } else {
            return 0;
        }

    } catch (error) {
        console.log(error);
        return 0;
    }
}

// GET - COMMENTS
export const getComments = async () => {
    try {
        const response = await fetch(urlComentarios, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.json();
        
    } catch (error) {
        console.log(error);
    }
}
/******** SECION DE SERVICIOS ***********/
// POST SOLICITUD
const urlSolicitud = "http://localhost:4000/solicitud";

export const newSolicitud = async Slc => {
    try {
        const respuesta = await fetch(urlSolicitud, {
            method: 'POST',
            body: JSON.stringify(Slc),
            headers: {
                'Content-Type': 'application/json'
            }
        });

      } catch (error) {
        console.log(error);
    }
};


export const getLastSolicitudId = async () => {
    try {
        const response = await fetch(urlSolicitud);
        const solicitudes = await response.json();

        if (solicitudes.length > 0) {
            const lastSolicitud = solicitudes[solicitudes.length - 1];
            return parseInt(lastSolicitud.id);
        } else {
            return 0;
        }

    } catch (error) {
        console.log(error);
        return 0;
    }
}

/*****************GET SOLICITUD **********************/

export const getSolicitud = async () => {

    try {
        const result = await fetch(urlSolicitud)
        const SolicitudesAdmin = await result.json()
        return SolicitudesAdmin
        
    } catch (error) {
        
    }
}

// GET SOLICITUD
