const fs = require('fs');

function gatherIngredients() {
  console.log('gathering ingredients');
  fs.readdir('./localData/recipes', callback);
  let ingredientsList = [];
  function callback(err, files) {
    if (err) console.log(err);

    files.forEach((file) => {
      const fileData = JSON.parse(
        fs.readFileSync(`./localData/recipes/${file}`)
      );
      const { ingredients } = fileData;
      ingredients.forEach((ingredient) => {
        let {
          ingredient_name,
          ingredient_cat,
          ingredient_group,
          ingredient_amount,
          ingredient_unit,
        } = ingredient;

        ingredientsList.push({
          ingredient_name,
          ingredient_cat: ingredient_cat || '',
          ingredient_group: ingredient_group || '',
          ingredient_amount: ingredient_amount || '',
          ingredient_unit: ingredient_unit || '',
        });
      });
    });

    fs.writeFileSync(
      './localData/ingredientsList.json',
      JSON.stringify(ingredientsList)
    );
  }
}

function gatherUnits() {
  console.log('gathering units');
  const ingredients = JSON.parse(
    fs.readFileSync('./localData/ingredientsList.json')
  );
  const units = ingredients.map((ingredient, i) => {
    if (!ingredient.ingredient_unit) console.log(i);
    return ingredient.ingredient_unit;
  });
  fs.writeFileSync('./localData/units.json', JSON.stringify(units));
}

function gatherUnitSet() {
  console.log('gathering unitSet');
  const units = JSON.parse(fs.readFileSync('./localData/units.json'));
  const unitsSet = Array.from(new Set(units));
  fs.writeFileSync('./localData/unitsSet.json', JSON.stringify(unitsSet));
}

// gatherIngredients();
// gatherUnits();
gatherUnitSet();
