//Variables
const formLogin = document.querySelector("form");
const email = document.getElementById("formEmail");
const password = document.getElementById("formPassword");

//Funcion anonima que verifica si esta logueado
(() => {
  if (localStorage.getItem("token")) document.location = "/home.html";
})();

//Render header
$(() => $("#header").load("header/header.html"));

function checkInputData() {
  if (email.value === "" || password.value === "") {
    return false;
  } else {
    return true;
  }
}

function login() {
  fetch(`${URL_API}?login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: email.value,
      password: password.value,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response["msg"] === "error") {
        alertify.error(response["reason"]);
        email.value = "";
        password.value = "";
      } else {
        // localStorage.setItem("id", response["id"]);
        localStorage.setItem("role", response["role"]);
        localStorage.setItem("token", response["token"]);
        document.location = "/home.html";
      }
    });
}

//Listener para btnSubmit
formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  if (checkInputData()) {
    login();
  }
});
