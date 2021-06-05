import { theme } from '../../variables';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRecommendPostHolder } from '../../redux/reducers/user/userActions';
import Post from './Post';

function timeDifference(previous) {
  const current = new Date();

  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerWeek = msPerDay * 7;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;

  let elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' 秒前';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' 分鐘前';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' 小時前';
  } else if (elapsed < msPerWeek) {
    return Math.round(elapsed / msPerDay) + ' 天前';
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerWeek) + ' 周前';
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + ' 個月前';
  } else {
    return Math.round(elapsed / msPerYear) + ' 年前';
  }
}

export default function QueryPost({ post }) {
  const d = useDispatch();
  const { by: name, profile_image, ingredients, timestamp, post_id } = post;
  console.log(name);
  function setPostHolder() {
    console.log(ingredients);
    d(setRecommendPostHolder(post));
  }
  return (
    <PostContent
      name={name}
      profile_image={profile_image}
      timestamp={timestamp}
    >
      <Title>發問：這些食材可以做甚麼呢？</Title>
      <Ingredients>
        {ingredients &&
          ingredients.map((ingredient, i) => (
            <Ingredient key={i}>
              {ingredient.ingredient_name} {ingredient.ingredient_amount}{' '}
              {ingredient.ingredient_unit}
            </Ingredient>
          ))}
      </Ingredients>
      <Button to={`/form/recommend/${post_id}`} onClick={setPostHolder}>
        幫助他！
      </Button>
    </PostContent>
  );
}

const PostContent = styled(Post)`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 0.9em;
  text-align: center;
  letter-spacing: 2px;
  text-indent: 5px;
  color: #706255;
`;
const Ingredients = styled.ul`
  display: flex;
  font-size: 1.2em;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 5px 0;
  padding: 5px 10px;
  border: 1px solid lightgray;
  border-radius: 5px;
`;
const Ingredient = styled.li``;
const Button = styled(Link)`
  width: 100%;
  border-top: 1px solid lightgray;
  padding: 10px 0;
  background-color: ${theme.lightOrange};
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  color: black;
  cursor: pointer;
  transition: background-color ease 0.1s;

  &:hover {
    background-color: ${theme.orange};
  }
`;
