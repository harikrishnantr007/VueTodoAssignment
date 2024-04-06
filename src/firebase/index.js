import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAbpt9YkfvnEA7NnII1E4tID-9HTedq3ns',
  authDomain: 'todosapp-991cc.firebaseapp.com',
  projectId: 'todosapp-991cc',
  storageBucket: 'todosapp-991cc.appspot.com',
  messagingSenderId: '687718369305',
  appId: '1:687718369305:web:cc7b1798fcebd4470d0288'
};
const app = initializeApp(firebaseConfig)
const db = getFirestore(app);
export
  {
db
}