const jb = require('nodejieba');
const dir = __dirname + '/recipe/';
const fs = require('fs');
const recipes = {};
fs.readdirSync(dir).forEach((file) => {
  recipes[file.replace(/\.json$/, '')] = require(dir + file);
});

jb.load({
  dict: './node_modules/nodejieba/dict/jieba.dict.utf8',
  userDict: './node_modules/nodejieba/dict/user.dict.utf8',
  hmmDict: './node_modules/nodejieba/dict/hmm_model.utf8',
  idfDict: './node_modules/nodejieba/dict/idf.utf8',
  stopWordDict: './node_modules/nodejieba/dict/stop_words.utf8',
});

// var sentence =
//   '我是拖拉机学院手扶拖拉机专业的。不用多久，我就会升职加薪，当上CEO，走上人生巅峰。';
// var result;

// // 没有主动调用nodejieba.load载入词典的时候，
// // 会在第一次调用cut或者其他需要词典的函数时，自动载入默认词典。
// // 词典只会被加载一次。

// result = jb.cut(sentence);
// console.log(result);

// result = jb.cut(sentence, true);
// console.log(result);

// result = jb.cutHMM(sentence);
// console.log(result);

// result = jb.cutAll(sentence);
// console.log(result);

// result = jb.cutForSearch(sentence);
// console.log(result);

// result = jb.tag(sentence);
// console.log(result);

// var topN = 5;
// result = jb.extract(sentence, topN);
// console.log(result);

// result = jb.cut('男默女泪');
// console.log(result);
// jb.insertWord('男默女泪');
// result = jb.cut('男默女泪');
// console.log(result);

// result = jb.cutSmall('南京市长江大桥', 3);
// console.log(result);

console.log(
  Object.values(recipes).map((recipe) =>
    Array.from(
      new Set([
        ...recipe.keyword.reduce((acc, keyword) => {
          acc.push(
            // ...jb.cutForSearch(keyword)

            // ...jb.cut(keyword)
            ...jb.cutHMM(keyword)
            // ...jb.tag(keyword).map((j) => j.word)
            // ...jb.extract(keyword, 5).map((ext) => ext.word)
          );
          return acc;
        }, []),
        ...recipe.keyword,
      ])
    )
  )
);
