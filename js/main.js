/*
 * YOUR URL API HERE ⬇️
 * YOUR URL API HERE ⬇️
 * YOUR URL API HERE ⬇️
 * YOUR URL API HERE ⬇️
 * YOUR URL API HERE ⬇️
 * YOUR URL API HERE ⬇️
 * YOUR URL API HERE ⬇️
 * YOUR URL API HERE ⬇️
 * YOUR URL API HERE ⬇️
 * YOUR URL API HERE ⬇️
 */
const URL_API = "http://127.0.0.1/Workspace/1)CrudUsers/CrudUsers-Api/index.php";
/*
 * YOUR URL API HERE ⬆️
 * YOUR URL API HERE ⬆️
 * YOUR URL API HERE ⬆️
 * YOUR URL API HERE ⬆️
 * YOUR URL API HERE ⬆️
 * YOUR URL API HERE ⬆️
 * YOUR URL API HERE ⬆️
 * YOUR URL API HERE ⬆️
 * YOUR URL API HERE ⬆️
 * YOUR URL API HERE ⬆️
 */
const roleUserLocal = localStorage.getItem("role");
const tokenUserLocal = localStorage.getItem("token");
const headersFetch = {
  "Content-Type": "application/json",
  role: roleUserLocal,
  token: tokenUserLocal,
};
function checkToken() {
  return fetch(`${URL_API}?checkToken`, {
    method: "POST",
    headers: headersFetch,
  })
    .then((response) => response.json())
    .then((response) => {
      if (response["msg"] === "OK") {
        return true;
      } else {
        return false;
      }
    });
}
function logout() {
  localStorage.clear();
  document.location = "/login.html";
}
