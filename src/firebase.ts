import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/analytics'
import 'firebase/auth'

import { firebaseConfig } from './ignored/firebaseConfig'

firebase.initializeApp(firebaseConfig)
firebase.analytics()
export default firebase