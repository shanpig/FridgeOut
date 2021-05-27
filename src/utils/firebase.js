import firebase from 'firebase';

// const firebase = require('firebase');
const firebaseConfig = {
  apiKey: 'AIzaSyAeh2HyVueHBPxSDEq9DQiXHsVDcQhffGI',
  authDomain: 'leftoverrecipe-3910d.firebaseapp.com',
  projectId: 'leftoverrecipe-3910d',
  storageBucket: 'leftoverrecipe-3910d.appspot.com',
  messagingSenderId: '691276619582',
  appId: '1:691276619582:web:f9c4a4f835912ad154166f',
  measurementId: 'G-GL512WJCPD',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// const auth = firebase.auth().useDeviceLanguage();
const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({
//   login_hint: 'user@example.com',
// });

function signInWithPopup() {
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const credential = result.credential;
      const token = credential.accessToken;
      const user = result.user;
      return {
        signInMethod: credential.signInMethod,
        accessToken: credential.accessToken,
        uid: user.uid,
        username: user.displayName,
        email: user.email,
        profileImage: user.photoURL,
      };
    })
    .catch((err) => {
      console.log(err);
      return '';
    });
}

function getUserData(uid) {
  return db
    .collection('users')
    .doc(uid)
    .get()
    .then((doc) => doc.data());
}

function updateUserFridge(uid, fridge) {
  return db.collection('users').doc(uid).update({ left_overs: fridge });
}
function updateUserKitchen(uid, kitchen) {
  return db.collection('users').doc(uid).update({ my_kitchen: kitchen });
}
function updateUserFavorites(uid, favorites) {
  return db.collection('users').doc(uid).update({ my_favorites: favorites });
}

function registerUser(userData) {
  db.collection('users')
    .doc(userData.uid)
    .set(userData)
    .then(() => console.log(`user ${userData.name} added.`));
}

// Due to firebase limitations, compound query cannot exceed 10 logical computations.
// e.g. getRecipes with idList larger than [Array(10)]

function getTimestamp() {
  return firebase.firestore.FieldValue.serverTimestamp();
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

// let data = getTimestamp();
// console.log(data);

export {
  signInWithPopup,
  getUserData,
  registerUser,
  getTimestamp,
  getRecipe,
  getRecipes,
  searchRecipesByIngredientNames,
  signUpNewUser,
  addToFavorite,
  removeFromFavorite,
  getUserInfoByEmail,
  sendMessageTo,
  post,
  getPosts,
  firebase,
};
