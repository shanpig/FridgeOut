import { theme } from '../../variables';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { watchMessages } from '../../utils/firebase';
import styled from 'styled-components';
import { timeDifference } from '../../utils/math';
import EmptyMessage from './EmptyMessage';
import { Animated } from 'react-animated-css';

const fromNewToOld = (message1, message2) => {
  return message2.timestamp - message1.timestamp;
};

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const userInfo = useSelector((state) => state.user_info);
  // const messages = useSelector((state) => {
  //   const userInfo = state.user_info;
  //   console.log(userInfo.messages);
  //   return userInfo.messages;
  // });

  useEffect(() => {
    setMessages(userInfo.messages);
  }, []);

  useEffect(() => {
    console.log(userInfo);
    const unsubscribe = watchMessages(userInfo, (newMessages) => {
      console.log(newMessages);
      setMessages(newMessages);
    });

    return unsubscribe();
  }, [userInfo]);

  return (
    <MessagesContent>
      {messages.length === 0 ? (
        <EmptyMessage text={'現在沒有訊息喔~'} />
      ) : (
        messages.sort(fromNewToOld).map((message, i) => {
          const { from, timestamp, recipe } = message;
          const time = new Date(timestamp.toDate());
          return (
            <Animated
              key={i}
              animationIn="fadeInUp"
              animationInDelay={(i - 1) * 100}
            >
              <Message>
                <From>
                  <Name>{from}</Name>
                  給了你一個食譜建議！
                  <Time>{timeDifference(time)}</Time>
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
            </Animated>
          );
        })
      )}
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

  & * {
    /* color: black; */
  }
`;

const Message = styled.li`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 15px 25px;
  border-radius: 5px;
`;

const RecipeImage = styled.div`
  /* flex-basis: 100px; */
  width: 100px;
  background-image: url(${(props) => props.src});
  background-size: 130%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #ececec;
  border-radius: 9px 0 0 9px;
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
  margin-top: 10px;
  border-radius: 10px;
  height: 100px;
  padding: 0;
  text-decoration: none;
  transition: all ease 0.3s, border-right ease 0.1s;

  &:hover {
    transform: translate(-2px, -5px);
    box-shadow: 1px 3px 4px lightgray;
    border-right: 10px solid ${theme.darkbrown};
  }
  &:hover ${RecipeImage} {
    background-size: 100%;
  }
`;

const RecipeContent = styled.div`
  flex-grow: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  gap: 10px;
  padding: 10px 10px;
`;

const From = styled.div`
  display: flex;
  align-items: baseline;
  padding: 0 5px 10px;
  font-family: 'Roboto';
  color: ${theme.darkbrown};
`;
const Name = styled.span`
  color: ${theme.darkbrown};
  font-size: 1.1em;
  margin-right: 5px;
`;
const Time = styled.span`
  margin-left: auto;
  color: #705256;
  font-size: 0.8em;
`;
const RecipeTitle = styled.h2`
  font-size: 1.5em;
  color: ${theme.darkbrown};
`;

const Ingredients = styled.ul`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;

const Ingredient = styled.li`
  color: ${theme.darkbrown};
  border-bottom: 1.5px solid ${theme.orange};
`;
