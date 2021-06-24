const firebase = require('firebase');
require('firebase/firestore');

firebase.initializeApp({
  apiKey: 'AIzaSyAeh2HyVueHBPxSDEq9DQiXHsVDcQhffGI',
  authDomain: 'leftoverrecipe-3910d.firebaseapp.com',
  projectId: 'leftoverrecipe-3910d',
});
const db = firebase.firestore();

const userData = {
  identity: 'user',
  name: 'Shanpig',
  email: 'shanpigLiao@gmail.com',
  profile: 'https://randomuser.me/api/portraits/men/75.jpg',
  id: 'io6ldONx2CUtoXIMxks4BKqGqxE2',
  left_overs: [
    {
      ingredient_name: '蛋',
      ingredient_amount: 5,
      ingredient_unit: '顆',
    },
    {
      ingredient_name: '紅蘿蔔',
      ingredient_amount: 0.5,
      ingredient_unit: '條',
    },
    {
      ingredient_name: '雞胸肉',
      ingredient_amount: 250,
      ingredient_unit: 'g',
    },
    {
      ingredient_name: '蔥',
      ingredient_amount: '',
      ingredient_unit: '',
    },
  ],
  my_favorites: [],
  messages: [
    {
      type: 'recommendation',
      from: 'David',
      timestamp: 1611264582,
      recipe: 'A05-7455',
    },
    {
      type: 'recommendation',
      from: 'David',
      timestamp: 1611264582,
      recipe: 'E01-0157',
    },
  ],
};

db.collection('users')
  .doc(userData.id)
  .set(userData)
  .then((data) => {
    console.log('hi');
    console.log(data.data());
  });
