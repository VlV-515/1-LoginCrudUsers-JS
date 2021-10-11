//Variables
const modalUser = new bootstrap.Modal(document.getElementById("modalUser"));
const tBody = document.querySelector("tbody");
const formUser = document.querySelector("form");
const username = document.getElementById("formEmail");
const password = document.getElementById("formPassword");
const role = document.getElementById("formRole");
let content = ""; //Usada para el contenido de la tabla
let newUserAction = undefined; //True para newUSer, false para editUser
let idForm = 0; //Para guardar el ID del user a editar

//Render header
$(() => $("#header").load("header/header.html"));

//Check Sesion
checkToken().then((response) => {
  /* Si es true, entonces todo esta bien, tomo el role del 
  local storage y si es admin lo dejo pasar. */
  if (response) {
    const roleUser = localStorage.getItem("role");
    if (roleUser != "admin") {
      logout();
    } else {
      getUsers();
    }
  } else {
    logout();
  }
});

//Funcion para obtener los usuarios del API
function getUsers() {
  fetch(`${URL_API}?users`, {
    method: "GET",
    headers: headersFetch,
  })
    .then((response) => response.json())
    /* .then((response) => console.log(response)) */
    .then((data) => printDataInTable(data))
    .catch((error) => console.log(error));
}

//Funcion para pintar los usuarios
function printDataInTable(users) {
  users.map((user) => {
    content += `<tr>
    <td>${user.id}</td>
    <td>${user.username}</td>
    <td>${user.password}</td>
    <td>${user.role}</td>
    <td>${user.createDate}</td>
    <td>
      <button type="button" class="btnEdit btn btn-warning">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
        </svg>
        Edit
      </button>
      <button type="button" class="btnDelete btn btn-danger">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
        Delete
      </button>
    </td>
  </tr>`;
  });
  tBody.innerHTML = content;
}

//Funcion para limpiar el modal.
const cleanModal = () => {
  username.value = "";
  password.value = "";
  role.value = 0;
};

//Funcion para guardar el usuario ya sea un new o un edit
const saveUser = (url) => {
  fetch(`${URL_API}?${url}`, {
    method: "POST",
    headers: headersFetch,
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      role: role.value,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response["msg"] === "error") {
        alertify.error(response["reason"]);
      } else {
        location.reload();
      }
    });
};

//Funcion para generar (simular) el metodo ON de jquery para el manejo del btnNewUser y btnEdit
const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

//Comportamiento btnNewUser.
//Limpiamos los campos del modal y lo mostramos.
btnNewUser.addEventListener("click", () => {
  cleanModal();
  newUserAction = true;
  modalUser.show();
});

//Comportamiento btnEdit
//Toma la fila y los datos de la misma para insertarlos en el modal y abrirlo.
on(document, "click", ".btnEdit", (e) => {
  const fila = e.target.parentNode.parentNode;
  idForm = fila.children[0].innerHTML;
  username.value = fila.children[1].innerHTML;
  password.value = fila.children[2].innerHTML;
  role.value = fila.children[3].innerHTML;
  newUserAction = false;
  modalUser.show();
});

/* Comportamiento btnDelete
Toma la fila y obtiene el id del user a eliminar, solicita una confirmacion.
Si no ocurre error, recarga para actualizar la tabla */
on(document, "click", ".btnDelete", (e) => {
  const row = e.target.parentNode.parentNode;
  const id = row.firstElementChild.innerHTML;
  alertify.confirm("Are you sure to delete this user?", () => {
    fetch(`${URL_API}?delete=${id}`, {
      method: "POST",
      headers: headersFetch,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response["msg"] === "error") {
          alertify.error(response["reason"]);
        } else {
          alertify.success("Delete");
          location.reload();
        }
      });
  });
});

//Comportamiento btnSubmit
formUser.addEventListener("submit", (e) => {
  e.preventDefault();
  if (newUserAction === true) {
    saveUser("insert");
  } else if (newUserAction === false) {
    saveUser(`update=${idForm}`);
  }
});
