import firebase from '../../firebase'

export const signIn = () => {
    firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
}

export const watchAuth = () => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          console.log(uid, isAnonymous)
        } else {
          console.log("SIGNED OUT")
        }
      });
}