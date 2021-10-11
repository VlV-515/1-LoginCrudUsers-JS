//Render header
$(() => $("#header").load("header/header.html"));
//Check Sesion
checkToken().then((response) => {
  if (!response) logout();
});
