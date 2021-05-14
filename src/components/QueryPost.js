export default function QueryPost({ post }) {
  const { by: name, profile_image, ingredients } = post;
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
      <ul className='ingredients'>
        {ingredients &&
          ingredients.map((ingredient, i) => (
            <li key={i}>
              {ingredient.ingredient_name} {ingredient.ingredient_amount}{' '}
              {ingredient.ingredient_unit}
            </li>
          ))}
      </ul>
    </div>
  );
}
