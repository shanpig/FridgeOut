import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRecommendPostHolder } from '../../redux/reducers/user/userActions';

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
        <ProfileImage src={profile_image} alt='' />
        <Name className='name'>{name}</Name>
        <Time>{new Date(timestamp.toDate()).toLocaleString()}</Time>
      </Profile>
      <Content>
        <Title>剩食求解：</Title>
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
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  padding-bottom: 0;
  background-color: white;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Name = styled.h2``;

const Time = styled.div`
  font-size: 0.8em;
  color: lightgray;
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
  color: gray;
`;
const Ingredients = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 5px;
`;
const Ingredient = styled.li``;
const Button = styled(Link)`
  width: 100%;
  border-top: 1px solid lightgray;
  padding: 5px 0;
  cursor: pointer;
`;
