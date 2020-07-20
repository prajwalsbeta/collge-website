import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyDP8YLLX7Q1HpHlet6zGyX9J0ufX3hgvhI',
	authDomain: 'aissms-hackathon.firebaseapp.com',
	databaseURL: 'https://aissms-hackathon.firebaseio.com',
	projectId: 'aissms-hackathon',
	storageBucket: 'aissms-hackathon.appspot.com',
	messagingSenderId: '882436405932',
	appId: '1:882436405932:web:7f77502649fba79e4dfd09',
	measurementId: 'G-J2ELQFWDBY',
}

firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()
export default firebase
