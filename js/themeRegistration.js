import { firestore, auth, storage } from './firebase'
let form = document.querySelector('form')
const error = document.getElementById('error-msg')
const thanks = document.getElementById('thanks')
const loader = document.querySelector('#loader')
let uid
let teamn
auth.onAuthStateChanged(function (user) {
	if (user) {
		// User is signed in.
		uid = user.uid
		const userRef = firestore.collection('teams').doc(user.uid)
		userRef.get().then((doc) => {
			if (!doc.exists) {
				console.log('No such document!')
			} else {
				let data = doc.data()
				console.log(data)
				document.querySelector("input[name='team-name']").value = data.teamName
				document.querySelector("input[name='team-leader-name']").value =
					data.teamLeaderName
				teamn = data.teamName
				document.querySelector("input[name='mobile-no']").value = data.mobileNo
				document.querySelector("input[name='email']").value = data.email
			}
		})
	} else {
		error.innerText = 'SOMETHING WENT WRONG'
	}
})

form.onsubmit = submit

async function submit(e) {
	e.preventDefault()
	loader.removeAttribute('hidden', '')
	error.setAttribute('hidden', true)
	thanks.setAttribute('hidden', true)
	let info = {
		teamMembers: [],
		status: null,
	}
	console.log('here')
	for (let i = 1; i <= 4; i++) {
		let member = {
			name: document.querySelector(`#member-name-${i}`).value,
			email: document.querySelector(`#member-email-${i}`).value,
			mobile: document.querySelector(`#member-mobile-no-${i}`).value,
		}
		info.teamMembers.push(member)
	}
	info.projectTheme = document.querySelector(
		"select[name='project-theme']"
	).value
	info.problem = document.querySelector("textarea[name='problem']").value
	info.solution = document.querySelector("textarea[name='solution']").value

	var ref = storage.ref()
	const file = document.querySelector("input[type='file']").files[0]
	const name = teamn + '-' + file.name
	const metaData = {
		contentType: file.type,
	}
	const snapshot = await ref.child(name).put(file, metaData)
	const url = await snapshot.ref.getDownloadURL()
	console.log(url)
	info.url = url
	console.log(info)
	const res = await firestore
		.collection('teams')
		.doc(uid)
		.set(info, { merge: true })
	loader.setAttribute('hidden', true)
	thanks.removeAttribute('hidden', '')
	form.reset()
}
