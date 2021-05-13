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

// Due to firebase limitations, compound query cannot exceed 10 logical computations.
// e.g. getRecipes with idList larger than [Array(10)]

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
  let recipes = [];
  await db
    .collection('recipes')
    .where('keyword', 'array-contains-any', ingredientNames)
    .get()
    .then((snap) => snap.forEach((doc) => recipes.push(doc.data())));
  console.log(recipes.map((recipe) => recipe.title + ' ' + recipe.id));
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

async function sendMessageTo(user_id, message) {
  let data = await db
    .collection('users')
    .doc(user_id)
    .update({
      messages: firebase.firestore.FieldValue.arrayUnion(message),
    });
  return data;
}

export {
  getRecipe,
  getRecipes,
  searchRecipesByIngredientNames,
  signUpNewUser,
  getUserInfoByEmail,
  sendMessageTo,
};
