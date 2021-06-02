import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAV-mHEQplsSE7eI6MCxrQYJyfnqf-XFFw",
  authDomain: "test-9977a.firebaseapp.com",
  databaseURL: "https://test-9977a.firebaseio.com",
  projectId: "test-9977a",
  storageBucket: "test-9977a.appspot.com",
  messagingSenderId: "255097689168",
  appId: "1:255097689168:web:933d0a38572dc16e14ed55",
  measurementId: "G-T4Z7SFFSNQ",
};
firebase.initializeApp(firebaseConfig);
export default firebase;

export const uploadImage = (image, name) => {
  return new Promise((resolve, reject) => {
    const storageRef = firebase
      .storage()
      .ref("users_profile_images")
      .child(name);

    const uploadTask = storageRef.putString(image, "data_url");
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // console.log(
        //   Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
        // );
      },
      (error) => {
        reject(error);
      },
      () => {
        storageRef.getDownloadURL().then((url) => {
          resolve(url);
        });
      }
    );
  });
};

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        resolve(userCredential.user);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createAccount = (email, password) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        resolve(userCredential.user);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
