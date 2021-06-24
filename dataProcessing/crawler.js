const Crawler = require('crawler');
const firebase = require('firebase');
const jb = require('nodejieba');
const fs = require('fs');
const rawWritten = fs.readFileSync('./written.json');
let written = JSON.parse(rawWritten);

require('firebase/firestore');

jb.load({
  dict: './node_modules/nodejieba/dict/jieba.dict.utf8',
  userDict: './node_modules/nodejieba/dict/user.dict.utf8',
  hmmDict: './node_modules/nodejieba/dict/hmm_model.utf8',
  idfDict: './node_modules/nodejieba/dict/idf.utf8',
  stopWordDict: './node_modules/nodejieba/dict/stop_words.utf8',
});

firebase.initializeApp({
  apiKey: 'AIzaSyAeh2HyVueHBPxSDEq9DQiXHsVDcQhffGI',
  authDomain: 'leftoverrecipe-3910d.firebaseapp.com',
  projectId: 'leftoverrecipe-3910d',
});

const db = firebase.firestore();

const HOST = 'https://www.ytower.com.tw';

let c = new Crawler({
  rateLimit: 3000,
  callback: function (error, res, done) {
    if (error) {
      console.log(error);
    } else {
      let $ = res.$;
      if ($('body').text() === '') done();

      const targets = Array.from($('#content ul li > a:last-child')).map(
        (target) => target.attribs.href
      );
      targets.forEach((target) => {
        const id = target.split('seq=')[1];
        if (written.includes(id)) {
          console.log('recipe ', id, ' scraped before, skipping...');
          return;
        }
        addNewRecipeURI(HOST + target);
      });
    }
    done();
  },
});

// Queue just one URL, with default callback
c.queue(
  Array(83)
    .fill()
    .map(
      (_, i) =>
        `${HOST}/recipe/pager.asp?keyword=%C2%B2%B3%E6&IsMobile=0&page=${i + 1}`
    )
);

function addNewRecipeURI(uri) {
  // Queue URLs with custom callbacks & parameters
  console.log('adding ', uri, '...');
  c.queue([
    {
      uri,
      // The global callback won't be called
      callback: crawlAndSaveRecipe,
    },
  ]);
}

function crawlAndSaveRecipe(error, res, done) {
  if (error) {
    console.log(error);
  } else {
    const $ = res.$;
    console.log('scraping uri: ' + res.options.uri);
    let group = '';

    const id = new URL(res.options.uri).searchParams.get('seq');

    const tags = Array.from($('.recie_tag a')).map(
      (tag) => tag.children[0].data
    );

    const title = $('#recipe_name a')
      .text()
      .replace(/\(\d+\)/g, '');

    if (!$('#recipe_mainpic img')[0]) console.log($('#recipe_mainpic'));
    const main_image = $('#recipe_mainpic img')[0].attribs.src;

    const ingredients = Array.from($('.ingredient'))
      .map((ingredientGroup) => {
        const liList = ingredientGroup.children.filter(
          (element) => element.name === 'li'
        );
        const category = liList[0].children[0].data;
        const ingredients = liList.slice(1).reduce((acc, ingredient) => {
          const retIngredient = {};

          ingredient.children
            .find((e) => e.name === 'span')
            .children.filter((c) => c.type === 'tag')
            .filter((c) => c.children.length !== 0)
            .forEach((content) => {
              if (content.name === 'a') {
                let name = content.children[0].data;
                if (name.match(/[a-zA-z]\./g)) {
                  [group, name] = name.split('.');
                  // console.log('category', name);
                }
                retIngredient['ingredient_name'] = name;
                retIngredient['ingredient_cat'] = category;
                retIngredient['ingredient_group'] = group;
              } else if (content.name === 'span') {
                const amount = content.children[0].data.match(/[\d\/\.]+/g);
                const unit = content.children[0].data.match(/[^\d\/\.]+/g);

                retIngredient['ingredient_amount'] = amount ? amount[0] : '';
                retIngredient['ingredient_unit'] = unit ? unit[0] : '';
              }
            });

          const isEmpty = Object.keys(retIngredient).length === 0;
          if (isEmpty) return acc;
          else return [...acc, retIngredient];
        }, []);
        return ingredients;
      })
      .flat();

    // console.log(ingredients);

    const steps = Array.from($('.step')).map((step) =>
      step.children[0].data
        .replace(/\r\n/g, '')
        .replace(/(\d\.)/g, '')
        .trim()
    );

    const originalKeyword = ingredients.map(
      (ingredient) => ingredient.ingredient_name
    );

    const keyword = Array.from(
      new Set([
        ...originalKeyword.reduce((acc, k) => [...acc, ...jb.cutHMM(k)], []),
        ...originalKeyword,
      ])
    );

    const recipe = {
      keyword,
      id,
      tags,
      title,
      main_image,
      ingredients,
      steps,
    };

    writeToDatabase(recipe);
  }
  done();
}

function writeToDatabase(recipe) {
  fs.writeFile(`./recipes/${recipe.title}.json`, JSON.stringify(recipe), () => {
    written.push(recipe.id);
    fs.writeFileSync('./written.json', JSON.stringify(written));
    console.log(recipe.title + ' written\n', recipe.ingredients);
  });
  // db.collection('recipes')
  //   .doc(recipe.id)
  //   .set(recipe)
  //   .then(() => {
  //     console.log(recipe.title + ' written');
  //     written.push(recipe.id);
  //   });
}
