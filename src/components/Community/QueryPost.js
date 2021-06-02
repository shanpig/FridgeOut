import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRecommendPostHolder } from '../../redux/reducers/user/userActions';

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
  function setPostHolder() {
    console.log(ingredients);
    d(setRecommendPostHolder(post));
  }
  return (
    <Post>
      <Profile>
        <ProfileImage src={profile_image} alt="" />
        <Name className="name">{name}</Name>
        <Time>{timeDifference(new Date(timestamp.toDate()))}</Time>
      </Profile>
      <Content>
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
      </Content>
    </Post>
  );
}

const Post = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  padding-bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);

  & * {
    color: black;
    font-family: 'Roboto';
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Name = styled.h2`
  font-size: 1.1em;
`;

const Time = styled.div`
  font-size: 0.8em;
  color: gray;
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h2`
  font-size: 1.2em;
  font-weight: bold;
  color: gray;
`;
const Ingredients = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 5px;
  padding: 5px 10px;
  border: 1px solid lightgray;
`;
const Ingredient = styled.li``;
const Button = styled(Link)`
  width: 100%;
  border-top: 1px solid lightgray;
  padding: 10px 0;
  text-align: center;
  text-decoration: none;
  color: black;
  cursor: pointer;
`;
