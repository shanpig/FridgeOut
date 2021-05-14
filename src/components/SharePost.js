import { useEffect, useState } from 'react';
import { getRecipe } from '../utils/firebase';

export default function SharePost({ post }) {
  const [recipe, setRecipe] = useState({});
  const { by: name, profile_image, recipe: recipeId } = post;

  useEffect(() => {
    getRecipe(recipeId).then((recipe) => {
      console.log(recipe);
      setRecipe(recipe);
    });
  }, []);

  return (
    <div className='post' style={{ display: 'flex', marginBottom: '20px' }}>
      <div className='profile'>
        <div className='name'>{name}</div>
        <img
          style={{ width: '100px', height: '100px', borderRadius: '50%' }}
          src={profile_image}
          alt=''
        />
      </div>
      <div className='recipe'>
        <h2>{recipe && recipe.title}</h2>
        <img
          style={{ width: '100px', height: '100px' }}
          src={recipe && recipe.main_image}
          alt=''
        />
      </div>
    </div>
  );
}
