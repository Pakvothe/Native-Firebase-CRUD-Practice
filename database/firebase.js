import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyC3bGRsNDE16H8XU7A3kpAhqsrHxGxc4tM',
	authDomain: 'native-crud-test.firebaseapp.com',
	projectId: 'native-crud-test',
	storageBucket: 'native-crud-test.appspot.com',
	messagingSenderId: '487594579130',
	appId: '1:487594579130:web:bfdb5f2815ebfd53191e83',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
	firebase,
	db,
};
