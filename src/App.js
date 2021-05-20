import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import IngredientForm from './components/common/IngredientForm';
import { addInput, removeInput } from './redux/reducers/keyword/keywordActions';
import { useEffect, useState } from 'react';
import { searchRecipesByIngredientNames } from './utils/firebase';
import {
  addRecipeToSelections,
  removeRecipeFromSelections,
} from './redux/reducers/selection/selectionActions';

function App() {
  const d = useDispatch();
  const [recipes, setRecipes] = useState([]);
  const [shownRecipesPage, setShownRecipesPage] = useState(0);
  const [ingredientsNeeded, setIngredientsNeeded] = useState([]);
  const search_keywords = useSelector((state) => state.search_keywords);
  const leftOvers = useSelector((state) => state.user_info.left_overs);
  const selectedRecipes = useSelector((state) => state.selected_recipes);

  useEffect(() => {
    let ingredientNames = search_keywords.map((s) => s.ingredient_name);
    searchRecipesByIngredientNames(ingredientNames).then((searchedRecipes) => {
      setRecipes(searchedRecipes);
    });
  }, [search_keywords.length]);

  useEffect(() => {
    console.log('recipe change: ', selectedRecipes);
    let gatheredIngredients = gatherCurrentIngredientsFromRecipes();
    console.log('gatheredIngredients', gatheredIngredients);
    setIngredientsNeeded(gatheredIngredients);
  }, [selectedRecipes]);

  function movePage(num) {
    let nextPage = shownRecipesPage + num;
    if (nextPage < 0 || nextPage > recipes.length / 10) return;
    setShownRecipesPage((p) => p + num);
  }

  function gatherCurrentIngredientsFromRecipes() {
    let gatheredIngredients = [];
    gatheredIngredients = selectedRecipes.map((recipe) => recipe.ingredients);
    return gatheredIngredients.flat();
  }

  return (
    <>
      <h2 style={{ fontSize: '30px' }}>FridgeOut</h2>
      <br />
      <p style={{ color: 'red' }}>功能：加入搜尋食材</p>
      <IngredientForm submitAction={addInput}></IngredientForm>
      <br />

      <p style={{ color: 'red' }}>功能：察看與刪除以搜尋食材</p>
      <h2>&lt;搜尋關鍵字&gt;</h2>
      <div>
        {search_keywords.map((keyword, i) => (
          <p key={i}>
            <button onClick={() => d(removeInput(keyword))}>X</button>
            <span>{Object.values(keyword).join(' ')}</span>
          </p>
        ))}
      </div>
      <br />
      <p style={{ color: 'red' }}>功能：查看使用者加入的食譜</p>
      <ul>
        {selectedRecipes.map((recipe, i) => (
          <li key={i}>{recipe.title}</li>
        ))}
      </ul>
      <br />
      <p style={{ color: 'red' }}>功能：查看使用者加入的食譜所用的食材</p>
      <ul
        style={{
          display: 'flex',
          maxHeight: '150px',
          flexDirection: 'column',
          flexWrap: 'wrap',
        }}>
        {ingredientsNeeded.map((ingredient, i) => {
          return (
            <li key={i}>
              {ingredient.ingredient_name} {ingredient.ingredient_amount}{' '}
              {ingredient.ingredient_unit}
            </li>
          );
        })}
      </ul>
      <br />
      <p style={{ color: 'red' }}>功能：查看使用者剩食</p>
      <h2>&lt;使用者剩食&gt;</h2>
      <ul>
        {leftOvers.map((leftover, i) => (
          <p key={i}>{Object.values(leftover).join(' ')}</p>
        ))}
      </ul>
      <br />
      <p style={{ color: 'red' }}>功能：搜尋食譜</p>
      <h2>&lt;搜尋到的食譜&gt;</h2>
      <button onClick={() => movePage(-1)}>上一頁</button>
      <button onClick={() => movePage(1)}>下一頁</button>
      <br />
      <br />
      <div>
        {recipes &&
          recipes
            .slice(shownRecipesPage * 10, shownRecipesPage * 10 + 10)
            .map((recipe, i) => (
              <div style={{ display: 'flex' }} key={i}>
                <input
                  type='checkbox'
                  onChange={(e) => {
                    if (e.target.checked) d(addRecipeToSelections(recipe));
                    else d(removeRecipeFromSelections(recipe.id));
                  }}
                />
                <div style={{ marginLeft: '5px' }} key={i}>
                  {recipe.title} {recipe.id}
                </div>
              </div>
            ))}
      </div>
    </>
  );
}

export default App;
