import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
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

console.log(firebaseConfig);

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage().ref();
const provider = new firebase.auth.GoogleAuthProvider();

function onUserChanged(setUser) {
  return firebase.auth().onAuthStateChanged((user) => {
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

function registerUser(userData) {
  db.collection('users').doc(userData.id).set(userData);
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

function getTimestamp() {
  return firebase.firestore.Timestamp.now();
}

function uploadImage(imageFile) {
  return storage
    .child(imageFile.name)
    .put(imageFile)
    .then((snap) => snap.ref.getDownloadURL());
}

// Due to firebase limitations, compound query cannot exceed 10 logical computations.
// e.g. getRecipes with idList larger than [Array(10)]

async function getRecipe(id) {
  return await db
    .collection('recipes')
    .doc(id)
    .get()
    .then((snap) => snap.data());
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
  registerUser,
  logOut,
  getUserData,
  getTimestamp,
  uploadImage,
  getRecipe,
  uploadRecipe,
  searchRecipesByIngredientNames,
  addRecipeToUserKitchen,
  removeRecipeFromUserKitchen,
  addRecipeToUserFavorites,
  removeRecipeFromUserFavorites,
  setUserLeftovers,
  addToFavorite,
  removeFromFavorite,
  sendMessageTo,
  post,
  watchMessages,
  getPosts,
};
