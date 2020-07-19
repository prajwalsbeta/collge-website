import { firebase, auth } from "./firebase";

document.addEventListener("DOMContentLoaded", redirect);
function redirect() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      window.location.replace(`${location.origin}/home.html`);
    } else {
      // User is signed in.
      document.querySelector("body").removeAttribute("hidden", "");
      console.log(user);
    }
  });
}
