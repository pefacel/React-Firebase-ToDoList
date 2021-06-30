import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDmSEacvkfWvC2D0W-F7Rp_Rm5pSrqD2p0",
  authDomain: "login-react-bluuweb.firebaseapp.com",
  projectId: "login-react-bluuweb",
  storageBucket: "login-react-bluuweb.appspot.com",
  messagingSenderId: "18049496928",
  appId: "1:18049496928:web:4470adced5ccb47e069005"
};
firebase.initializeApp(firebaseConfig);

export { firebase }

const db = firebase.firestore()
const auth = firebase.auth()

export {db, auth}