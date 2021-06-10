import { theme } from '../../variables';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRecommendPostHolder } from '../../redux/reducers/user/userActions';
import Post from './Post';

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
      <Button to={`/form/recommend/${post_id}`} onClick={setPostHolder}>
        <Ingredients>
          {ingredients &&
            ingredients.map((ingredient, i) => (
              <Ingredient key={i}>
                {ingredient.ingredient_name} {ingredient.ingredient_amount}{' '}
                {ingredient.ingredient_unit}
              </Ingredient>
            ))}
          {/* <Button to={`/form/recommend/${post_id}`} onClick={setPostHolder}> */}
          <Text>幫助他！</Text>
          {/* </Button> */}
        </Ingredients>
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

const Text = styled.div`
  width: 100%;
  text-align: center;
  /* border-top: 1px solid #bababa; */
  padding: 5px 5px 0;
  font-size: 0.7em;
  color: #605245;
  transition: all ease 0.2s;

  position: absolute;
  bottom: 10px;

  @media screen and (min-width: 769px) {
    bottom: -100%;
  }
`;

const Ingredients = styled.ul`
  display: flex;
  position: relative;
  font-size: 1.2em;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 15px 0 5px;
  padding: 10px 20px 40px;
  /* border: 1px solid lightgray; */
  border-radius: 5px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.6);
  transition: all 0.2s ease;
  overflow: hidden;
  transform: translateY(-5px);
  box-shadow: 1px 5px 4px lightgray;

  @media screen and (min-width: 769px) {
    transform: translateY(0);
    padding-bottom: 10px;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 1px 5px 4px lightgray;
      padding-bottom: 40px;
      & ${Text} {
        bottom: 10px;
      }
    }
  }
`;
const Ingredient = styled.li``;
const Button = styled(Link)`
  text-decoration: none;
`;
