import { theme } from '../../variables';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import RecipeItem from '../SearchPage/RecipeItem';
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
              <From>{from}</From>
              <Time>{time}</Time>
              <Recipe>
                <RecipeImage src={recipe.main_image} />
                <RecipeTitle>{recipe.title}</RecipeTitle>
              </Recipe>
            </Message>
          );
        })}
    </MessagesContent>
  );
}

const MessagesContent = styled.ul`
  padding: 0 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Recipe = styled(RecipeItem)`
  border: 1px solid ${theme.orange};
  height: 100px;
`;

const RemoveButton = styled(GrFormTrash)`
  min-width: 25px;
  font-size: 25px;
  margin-left: auto;
  cursor: pointer;
`;

const Message = styled.div``;
const From = styled.div``;
const Time = styled.div``;
const RecipeTitle = styled.h2``;
const RecipeImage = styled.img``;
