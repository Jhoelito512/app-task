let loadingScreen = document.querySelector('.loading-screen');
document.addEventListener("DOMContentLoaded", function () {
    getTasks();

    //Mostrar el modal de registro de tareas
    setTimeout(() => {
        closeModal();
        openModalSaveTask();
        openModalUpdateTask();
        openModalLogout();
        openModalProfile();
        logOut()
        sendData();
        updateData();
        changeStatusTask();
        buscarTask();
        deleteTask();
        loadingScreen.classList.add("hidden");
    }, 500);

});

/*
 * Funcion que cierra el modal
 */
function closeModal() {
    let arrData = document.querySelectorAll('.btn-close-modal');
    arrData.forEach((element) => {
        element.addEventListener("click", () => {
            let modal = document.querySelectorAll('.modal');
            modal.forEach(element => {
                element.classList.add("hidden");
            })
        });
    })
}
/*
 *Funcion que abre el modal para registrar nuevas tareas
 */
function openModalSaveTask() {
    let btnFormRegisterTask = document.getElementById('btn-form-register');
    btnFormRegisterTask.addEventListener("click", function () {
        let modalSaveTask = document.querySelector('.modal-save-task');
        modalSaveTask.classList.remove("hidden");
    });
}
/*
 *Funcion que abre el modal para Actualizar tareas
 */
function openModalUpdateTask() {
    let btnEditTasks = document.querySelectorAll('.btn-edit');
    btnEditTasks.forEach(btn => {
        btn.addEventListener("click", function () {
            let modalUpdateTask = document.querySelector('.modal-update-task');
            const idTask = btn.getAttribute('data-id');
            const titleTask = btn.getAttribute('data-title');
            const descriptionTask = btn.getAttribute('data-descripcion');
            const dateTask = btn.getAttribute('data-date');
            const timeTask = btn.getAttribute('data-time');
            document.querySelector('#task-id-upd').value = idTask;
            document.querySelector('#task-title-upd').value = titleTask;
            document.querySelector('#task-description-upd').value = descriptionTask;
            document.querySelector('#task-date-upd').value = dateTask;
            document.querySelector('#task-time-upd').value = timeTask;
            modalUpdateTask.classList.remove("hidden");
        });
    });
}

/*
 *Funcion que abre el modal para cerrar sesion 
 */
function openModalLogout() {
    let btnOpenModalLogout = document.getElementById('btn-exit-sesion');
    btnOpenModalLogout.addEventListener("click", () => {
        let modalExitSesion = document.querySelector('.modal-exit-sesion');
        modalExitSesion.classList.remove("hidden");
    })
}
/*
 * Open modal Perfil
 */
function openModalProfile() {
    let btnModalProfile = document.getElementById('btn-form-profile');
    btnModalProfile.addEventListener("click", () => {
        let modalPRofile = document.querySelector('.modal-profile-user');
        modalPRofile.classList.remove("hidden");
    })
}

/*
 *Funcion que verifica si el usuario a ingresado al sistema 
 */
function verifySessionUser() {
    const url = "http://localhost/app-task/Api/verifySessionUser.php";
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Ocurrio un error inesperado" + response.status);
            }
            return response.json();
        })
        .then((data) => {
            if (!data.status) {
                viewAlert(data.type, data.message);
                window.location.href = data.url
            }
            let userName = document.querySelector(".user-name")
            userName.innerHTML = data.infoUser.nombre_usuario
        })
        .catch((e) => {
            viewAlert("error", e.message);
        })
}
/*
 * Funcion que permite cerrar sesion
 */
function logOut() {
    const btnExit = document.querySelector(".btn-exit-modal");
    btnExit.addEventListener("click", () => {
        window.location.href = "http://localhost/app-task/Api/logOut.php";
    })
}
/**
 * Funcion que registra las tareas
 */
function sendData() {
    if (document.querySelector("#task-form")) {
        const saveForm = document.querySelector("#task-form");
        saveForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(saveForm);
            const encabezados = new Headers();
            const config = {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: encabezados,
                body: formData
            }
            const url = "http://localhost/app-task/Api/createTask.php";
            fetch(url, config)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Error en la solicitud " + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    if (!data.status) {
                        viewAlert(data.type, data.message);
                        return false;
                    }
                    getTasks();
                    saveForm.reset();
                    viewAlert(data.type, data.message);
                    setTimeout(() => {
                        closeModal();
                        openModalSaveTask();
                        openModalUpdateTask();
                        openModalLogout();
                        openModalProfile();
                        logOut()
                        sendData();
                        updateData();
                        changeStatusTask();
                        buscarTask();
                        deleteTask();
                    }, 500);
                    return true;
                })
                .catch(error => {
                    viewAlert("error", error.message);
                })
        })
    }
}
/**
* funcion que muestra las tareas
*/
function getTasks() {
    const url = "http://localhost/app-task/Api/getTasks.php";
    let listTasks = document.querySelector("#task-list");

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la solicitud " + response.status);
            }
            return response.json();
        })
        .then(response => {
            if (!response.status) {
                listTasks.innerHTML = "";
                viewAlert(response.type, response.message);
                return false;
            }
            let arrDataTask = response.data;
            let itemTasks = "";
            arrDataTask.forEach(item => {
                itemTasks += `
                  <li>
                <div class="task-info">
                    <span class="task-title">${item.titulo}</span>
                    <span class="task-description">${item.descripcion}</span>
                    <span class="task-date">${item.fecha}</span>
                    <span class="task-time">${item.hora}</span>
                </div>
                <div class="containt-btn-task">
                    <button class="btn-delete" data-id="${item.id}"> <i class="fas fa-trash"></i></button>
                    <button class="btn-edit" data-id="${item.id}" data-title="${item.titulo}" data-descripcion="${item.descripcion}" data-date="${item.fecha}" data-time="${item.hora}"> <i class="fas fa-edit"></i></button>
                    <button class="btn-comment" data-id="${item.id}"> <i class="fas fa-comment"></i></button>
                    <div class="checkbox-container">
                        <input type="checkbox" name="task-done" class="task-done" data-id="${item.id}" ${(item.estado == "hecha") ? "checked" : ""}>
                        <label for="task-done">${item.estado}</label>
                    </div>
                </div>
            </li>
                `;
            });
            listTasks.innerHTML = itemTasks;
        })
        .catch(error => {
            listTasks.innerHTML = "";
            viewAlert("error", error.message);
        })
}
/**
* funcion permite cargar la vista de editar tarea
*/
function changeStatusTask() {
    if (!document.querySelector(".task-done")) {
        viewAlert("error", "No hay tareas registradas");
        return false;
    }
    const taskDone = document.querySelectorAll(".task-done");
    taskDone.forEach((element) => {
        element.addEventListener('change', (e) => {
            const idTask = element.getAttribute('data-id');
            let estado;
            if (element.checked) {
                estado = "hecha";
                msg = "Tarea hecha";
                tipo = "success";
            } else {
                estado = "pendiente";
                msg = "Tarea pendiente";
                tipo = "error";
            }
            let data = new FormData();
            data.append("id", idTask);
            data.append("estado", estado);
            let encabezados = new Headers();
            let config = {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: encabezados,
                body: data
            }
            const url = "http://localhost/app-task/Api/updateStatusTask.php";
            fetch(url, config)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Error en la solicitud " + response.status);
                    }
                    return response.json();
                })
                .then((result) => {
                    if (!result.status) {
                        viewAlert(result.type, result.message);
                        return false;
                    }
                    getTasks();
                    viewAlert(tipo, msg);
                    setTimeout(() => {
                        changeStatusTask();
                    }, 500);
                })
                .catch((error) => {
                    viewAlert("error", error.message);
                })

        });
    });
}
/**
* funcion eliminar tarea
*/
function deleteTask() {
    if (!document.querySelector(".btn-delete")) {
        viewAlert("error", "No hay tareas registradas");
        return false;
    }
    const btnDelete = document.querySelectorAll(".btn-delete");
    btnDelete.forEach((element) => {
        element.addEventListener('click', (e) => {
            if (!confirm("¿Desea eliminar la tarea?")) {
                return false;
            }
            const idTask = element.getAttribute('data-id');
            let data = new FormData();
            data.append("id", idTask);
            let encabezados = new Headers();
            let config = {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: encabezados,
                body: data
            }
            const url = "http://localhost/app-task/Api/deleteTask.php";
            fetch(url, config)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Error en la solicitud " + response.status);
                    }
                    return response.json();
                })
                .then((result) => {
                    if (!result.status) {
                        viewAlert(result.type, result.message);
                        return false;
                    }
                    getTasks();
                    viewAlert(data.type, data.message);
                    setTimeout(() => {
                        closeModal();
                        openModalSaveTask();
                        openModalUpdateTask();
                        openModalLogout();
                        openModalProfile();
                        logOut()
                        sendData();
                        updateData();
                        changeStatusTask();
                        buscarTask();
                        deleteTask();
                    }, 500);
                })
                .catch((error) => {
                    viewAlert("error", error.message);
                })
        });
    });
}
/*
* funcion actualizar tarea
*/
function updateData() {
    if (document.querySelector("#task-update")) {
        const updateForm = document.querySelector("#task-update");
        updateForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(updateForm);
            const encabezados = new Headers();
            const config = {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: encabezados,
                body: formData
            }
            const url = "http://localhost/app-task/Api/updateTask.php";
            fetch(url, config)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Error en la solicitud " + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    if (!data.status) {
                        viewAlert(data.type, data.message);
                        return false;
                    }
                    getTasks();
                    saveForm.reset();
                    viewAlert(data.type, data.message);
                    return true;
                })
                .catch(error => {
                    viewAlert("error", error.message);
                });
        });
    }
}
/*
* funcion que permite buscar una tarea
*/
function buscarTask() {
    if (document.querySelector("#task-buscar")) {
        const saveForm = document.querySelector("#task-buscar");
        saveForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(saveForm);
            const encabezados = new Headers();
            const config = {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: encabezados,
                body: formData
            }
            const url = "http://localhost/app-task/Api/buscarTask.php";
            fetch(url, config)
                .then(result => {
                    if (!result.ok) {
                        throw new Error("Error en la solicitud " + response.status);
                    }
                    return result.json();
                })
                .then(data => {
                    if (!data.status) {
                        viewAlert(data.type, data.message);
                        return false;
                    }
                    getTasks();
                    saveForm.reset();
                    viewAlert(data.type, data.message);
                    return true;
                })
                .catch(error => {
                    viewAlert("error", error.message);
                })
        });
    }
}


