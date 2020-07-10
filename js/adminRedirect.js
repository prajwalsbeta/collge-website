import { firebase, auth } from "./firebase";

document.addEventListener("DOMContentLoaded", redirect);
function redirect() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      if (user.uid === "lp4awRKScwfOnyIzS5VVyrYlbZn1") {
        document.querySelector("body").removeAttribute("hidden", "");
        console.log(user);
      } else {
        window.location.replace(`${location.origin}/home.html`);
      }
    } else {
      window.location.replace(`${location.origin}/login.html`);
    }
  });
}
