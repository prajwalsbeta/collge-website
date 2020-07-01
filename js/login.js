import { firebase, auth } from './firebase'
const form = document.getElementById('login-form')
const error = document.getElementById('error-msg')
const loginBtn = document.querySelector("button[type='submit']")
const loader = document.querySelector('#loader')

const recoverPasswordBtn = document.getElementById('recover-password')
const mailSentMsg = document.getElementById('mail-sent-msg')
const recoveryError = document.getElementById('recovery-error')

recoverPasswordBtn.onclick = forgetPassword

form.onsubmit = submit

function forgetPassword(e) {
	e.preventDefault()
	//reset to default
	mailSentMsg.setAttribute('hidden', true)
	recoveryError.setAttribute('hidden', true)

	const emailForPassRecovery = document.getElementById('input-email').value
	auth
		.sendPasswordResetEmail(emailForPassRecovery)
		.then(function () {
			// Email sent.
			mailSentMsg.removeAttribute('hidden', '')
		})
		.catch(function (error) {
			recoveryError.removeAttribute('hidden', '')
			recoveryError.innerText = error.message
			console.log(error.message)
		})
}

async function submit(event) {
	event.preventDefault()
	error.setAttribute('hidden', true)
	loader.removeAttribute('hidden', '')
	const email = document.querySelector("input[name = 'email']").value
	const password = document.querySelector("input[name = 'password']").value
	await login(email, password)
}

function login(email, password) {
	auth
		.signInWithEmailAndPassword(email, password)
		.then((userCredential) => {
			let userDetails = {
				id: userCredential.user.uid,
				email: userCredential.user.email,
			}
			localStorage.setItem('user', JSON.stringify(userDetails))
			window.location.replace(`${location.origin}/home.html`)
		})
		.catch(function (err) {
			loader.setAttribute('hidden', true)
			error.removeAttribute('hidden', '')
			error.innerText = err.message
			console.log(err.message)
		})
}
