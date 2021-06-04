import { theme } from '../../variables';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GrFormTrash } from 'react-icons/gr';
import { removeFromKitchen } from '../../redux/reducers/user/userActions';
import { timeDifference } from '../../utils/math';

const fromNewToOld = (message1, message2) => {
  return message2.timestamp - message1.timestamp;
};

export default function Messages() {
  const messages = useSelector((state) => {
    const userInfo = state.user_info;
    console.log(userInfo.messages);
    return userInfo.messages;
  });

  return (
    <MessagesContent>
      {messages &&
        messages.sort(fromNewToOld).map((message, i) => {
          const { from, timestamp, recipe } = message;
          const time = new Date(timestamp.toDate());
          return (
            <Message>
              <From>
                <Name>{from}</Name> 在 <Time>{timeDifference(time)}</Time>{' '}
                給了你一個食譜建議！
              </From>

              <Recipe to={`/recipe/${recipe.id}`}>
                <RecipeImage src={recipe.main_image} />
                <RecipeContent>
                  <RecipeTitle>{recipe.title}</RecipeTitle>
                  <Ingredients>
                    {recipe.ingredients.slice(0, 5).map((ingredients) => (
                      <Ingredient>{ingredients.ingredient_name}</Ingredient>
                    ))}
                  </Ingredients>
                </RecipeContent>
              </Recipe>
            </Message>
          );
        })}
    </MessagesContent>
  );
}

const MessagesContent = styled.ul`
  position: relative;
  padding: 0 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;

  & * {
    color: black;
  }
`;

const Message = styled.li`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 15px;
`;

const RecipeImage = styled.div`
  /* flex-basis: 100px; */
  width: 100px;
  background-image: url(${(props) => props.src});
  background-size: 130%;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-size ease 1s;

  @media screen and (min-width: 460px) {
    width: 150px;
  }
  @media screen and (min-width: 600px) {
    width: 200px;
  }
`;

const Recipe = styled(Link)`
  border: 1px solid gray;
  display: flex;
  height: 100px;
  text-decoration: none;

  &:hover ${RecipeImage} {
    background-size: 100%;
  }
`;

const RecipeContent = styled.div`
  flex-grow: 3;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
  padding: 10px 10px;
`;

const From = styled.div`
  padding: 0 5px 10px;
`;
const Name = styled.span`
  font-size: 1.2em;
`;
const Time = styled.span`
  margin: 0 5px;
`;
const RecipeTitle = styled.h2`
  font-size: 1.5em;
`;

const Ingredients = styled.ul`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;
const Ingredient = styled.li``;
