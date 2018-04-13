import firebase from 'firebase'

// Init Firebase
const config = {
  apiKey: "AIzaSyAD6vYOiblwoSmVI95GmCbV0WkgJLdTQR0",
  authDomain: "cooklab-cb6c0.firebaseio.com",
  storageBucket: "cooklab-cb6c0.appspot.com",
}
firebase.initializeApp(config)

const firebaseInstance = firebase
export default firebaseInstance