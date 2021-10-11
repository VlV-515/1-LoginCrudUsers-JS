const roleUser = localStorage.getItem("role");
const tokenUser = localStorage.getItem("token");
const isLogin = document.getElementById("isLogin");
const isAdmin = document.getElementById("isAdmin");
const btnHome = document.getElementById("btnHome");
const btnAdmin = document.getElementById("btnAdmin");
const currentDateHTML = document.getElementById("currentDate");
//Funcion anonima que muestra los items de header(nav)
(() => {
  if (roleUser != null && tokenUser != null) {
    printDateInDocument();
    {
      //Bloque que verifica donde estas para mostrar o no ciertos botones en el nav.
      let urlCurrent = document.location.href;
      urlCurrent = urlCurrent.split("/");
      let urlFinaly = urlCurrent[urlCurrent.length - 1];
      if (urlFinaly.includes("home")) {
        btnHome.style.display = "none";
      } else if (urlFinaly.includes("admin")) {
        btnAdmin.style.display = "none";
      }
    }
    isLogin.style.display = "block";
    if (roleUser == "admin") isAdmin.style.display = "block";
  }
})();
//Toma la fecha actual y la inyecta en el documento.
function printDateInDocument() {
  let currentDate = new Date();
  let date = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()} `;
  currentDateHTML.innerHTML = date;
}
