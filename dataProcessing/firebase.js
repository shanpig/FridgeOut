const fs = require('fs');
const firebase = require('firebase');
const { join } = require('path');
require('firebase/firestore');
firebase.initializeApp({
  apiKey: 'AIzaSyAeh2HyVueHBPxSDEq9DQiXHsVDcQhffGI',
  authDomain: 'leftoverrecipe-3910d.firebaseapp.com',
  projectId: 'leftoverrecipe-3910d',
});
const db = firebase.firestore();

function getRecipeNums() {
  return db
    .collection('recipes')
    .get()
    .then((snap) => {
      let count = 0;
      snap.forEach((doc) => count++);
      return count;
    });
}

function getIngredientUnits() {
  db.collection('recipes')
    .get()
    .then((snap) => {
      let ingredientList = [];
      let units = [];
      snap.forEach((doc) => {
        let { ingredients } = doc.data();
        console.log('in ', doc.id);
        ingredients.forEach((ingredient) => {
          const {
            ingredient_name: name,
            ingredient_amount: amount,
            ingredient_unit: unit,
          } = ingredient;
          ingredientList.push(`${name} ${amount} ${unit}`);
          units.push(unit);
        });
      });
      fs.writeFileSync('./ingredientList.json', JSON.stringify(ingredientList));
      fs.writeFileSync('./units.json', JSON.stringify(units));
    });
  return;
}

function uploadRecipes() {
  fs.readdir('./localData/recipes', (err, files) => {
    if (err) console.log(err);
    files.forEach((file) => {
      const recipe = JSON.parse(fs.readFileSync(`./localData/recipes/${file}`));
      db.collection('recipes')
        .doc(recipe.id)
        .set(recipe)
        .then(() => {
          console.log(`recipe ${recipe.id} ${recipe.title} written.`);
        });
    });
  });
}

uploadRecipes();
