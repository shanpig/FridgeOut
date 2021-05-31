import { theme } from '../../variables';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GrFormTrash } from 'react-icons/gr';
import { removeFromKitchen } from '../../redux/reducers/user/userActions';

export default function Messages() {
  const messages = useSelector((state) => {
    const userInfo = state.user_info;
    console.log(userInfo.messages);
    return userInfo.messages;
  });

  return (
    <MessagesContent>
      {messages &&
        messages.map((message, i) => {
          const { from, timestamp, recipe } = message;
          const time = new Date(timestamp.toDate()).toLocaleString();
          return (
            <Message>
              <From>
                {from} <Time>{time}</Time>
              </From>

              <Recipe>
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
  gap: 10px;
`;

const Message = styled.li`
  background-color: white;
  padding: 5px;
`;

const Recipe = styled.div`
  border: 1px solid ${theme.orange};
  display: flex;
  height: 100px;
`;

const RecipeContent = styled.div`
  flex-grow: 3;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
`;

const From = styled.div``;
const Time = styled.span``;
const RecipeTitle = styled.h2``;
const RecipeImage = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Ingredients = styled.ul`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;
const Ingredient = styled.li``;
