import firebase from 'firebase';
require('dotenv').config();

// const firebase = require('firebase');
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage().ref();
const provider = new firebase.auth.GoogleAuthProvider();

function onUserChanged(setUser) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else setUser({});
  });
}

function signInWithPopup() {
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      return {
        uid: user.uid,
        username: user.displayName,
        email: user.email,
        profileImage: user.photoURL,
      };
    })
    .catch((err) => {
      return err;
    });
}

function logOut() {
  return firebase.auth().signOut();
}

function getUserData(uid) {
  return db
    .collection('users')
    .doc(uid)
    .get()
    .then((doc) => doc.data());
}

function addRecipeToUserKitchen(uid, recipe) {
  return db
    .collection('users')
    .doc(uid)
    .update({ my_kitchen: firebase.firestore.FieldValue.arrayUnion(recipe) });
}

function removeRecipeFromUserKitchen(uid, recipe) {
  return db
    .collection('users')
    .doc(uid)
    .update({ my_kitchen: firebase.firestore.FieldValue.arrayRemove(recipe) });
}

function setUserLeftovers(uid, leftovers) {
  return db.collection('users').doc(uid).update({
    left_overs: leftovers,
  });
}

function addRecipeToUserFavorites(uid, recipe) {
  return db
    .collection('users')
    .doc(uid)
    .update({ my_favorites: firebase.firestore.FieldValue.arrayUnion(recipe) });
}

function removeRecipeFromUserFavorites(uid, recipe) {
  return db
    .collection('users')
    .doc(uid)
    .update({
      my_favorites: firebase.firestore.FieldValue.arrayRemove(recipe),
    });
}

function registerUser(userData) {
  db.collection('users').doc(userData.id).set(userData);
}

function uploadImage(imageFile) {
  return storage
    .child(imageFile.name)
    .put(imageFile)
    .then((snap) => snap.ref.getDownloadURL());
}

// Due to firebase limitations, compound query cannot exceed 10 logical computations.
// e.g. getRecipes with idList larger than [Array(10)]

function getTimestamp() {
  return firebase.firestore.Timestamp.now();
}

async function getRecipe(id) {
  return await db
    .collection('recipes')
    .doc(id)
    .get()
    .then((snap) => snap.data());
}

async function getRecipes(idList) {
  let recipes = [];
  await db
    .collection('recipes')
    .where('id', 'in', idList)
    .get()
    .then((snap) => {
      snap.forEach((s) => recipes.push(s.data()));
    });

  return recipes;
}

async function searchRecipesByIngredientNames(ingredientNames) {
  if (ingredientNames.length === 0) return [];
  let recipes = [];
  await db
    .collection('recipes')
    .where('keyword', 'array-contains-any', ingredientNames)
    .get()
    .then((snap) => snap.forEach((doc) => recipes.push(doc.data())));
  return recipes;
}

async function signUpNewUser(userInfo) {
  const isRegistered =
    (await db
      .collection('users')
      .where('email', '==', userInfo.email)
      .get()
      .then((snap) => snap.length)) !== 0;
  if (!isRegistered) {
    return await db
      .collection('users')
      .add(userInfo)
      .then((docRef) => {
        docRef.update({
          id: docRef.id,
        });
        return docRef.id;
      });
  } else return 0;
}

async function getUserInfoByEmail(email) {
  let userInfo = [];
  await db
    .collection('users')
    .where('email', '==', email)
    .get()
    .then((snap) => {
      snap.forEach((s) => userInfo.push(s.data()));
    });
  return userInfo[0];
}

async function addToFavorite(userId, recipeId) {
  return await db
    .collection('users')
    .doc(userId)
    .update({
      my_favorites: firebase.firestore.FieldValue.arrayUnion(recipeId),
    });
}

async function removeFromFavorite(userId, recipeId) {
  return await db
    .collection('users')
    .doc(userId)
    .update({
      my_favorites: firebase.firestore.FieldValue.arrayRemove(recipeId),
    });
}

async function sendMessageTo(userId, message) {
  message.timestamp = getTimestamp();

  return await db
    .collection('users')
    .doc(userId)
    .update({
      messages: firebase.firestore.FieldValue.arrayUnion(message),
    });
}

async function post(message) {
  message.timestamp = getTimestamp();
  return await db
    .collection('society')
    .add(message)
    .then((docRef) => {
      docRef.update({
        post_id: docRef.id,
      });
      return docRef.id;
    });
}

function watchMessages(userInfo, callback) {
  return db
    .collection('users')
    .doc(userInfo.id)
    .onSnapshot((doc) => {
      const messages = doc.data().messages;

      callback(messages);
    });
}

function uploadRecipe(recipe) {
  return db
    .collection('recipes')
    .add(recipe)
    .then((docRef) => {
      docRef.update({
        id: docRef.id,
      });
      return docRef.id;
    });
}

async function getPosts() {
  return await db
    .collection('society')
    .get()
    .then((snap) => {
      let posts = [];
      snap.forEach((doc) => posts.push(doc.data()));
      return posts;
    });
}

export {
  onUserChanged,
  signInWithPopup,
  logOut,
  getUserData,
  registerUser,
  getTimestamp,
  getRecipe,
  getRecipes,
  uploadImage,
  searchRecipesByIngredientNames,
  addRecipeToUserKitchen,
  removeRecipeFromUserKitchen,
  addRecipeToUserFavorites,
  removeRecipeFromUserFavorites,
  setUserLeftovers,
  signUpNewUser,
  addToFavorite,
  removeFromFavorite,
  getUserInfoByEmail,
  sendMessageTo,
  post,
  watchMessages,
  getPosts,
  uploadRecipe,
  firebase,
};
