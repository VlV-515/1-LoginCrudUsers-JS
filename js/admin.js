//Render header
$(() => $("#header").load("header/header.html"));
//Check Sesion
checkToken().then((response) => {
  /* Si es true, entonces todo esta bien, tomo el role del 
  local storage y si es admin lo dejo pasar. */
  if (response) {
    const roleUser = localStorage.getItem("role");
    if (roleUser != "admin") logout();
  } else {
    logout();
  }
});
