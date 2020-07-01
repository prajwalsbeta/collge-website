import { firebase, auth } from './firebase'

const logout = document.querySelector('#logout')
logout.onclick = function () {
	auth
		.signOut()
		.then(function () {
			// Sign-out successful.
		})
		.catch(function (error) {
			alert(error.message)
		})
}
