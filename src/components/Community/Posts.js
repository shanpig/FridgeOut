import { footerConfig, theme } from '../../variables';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import QueryPost from './QueryPost';
import SharePost from './SharePost';
import { getPosts } from '../../utils/firebase';
import { Animated } from 'react-animated-css';
import { BsPencilSquare } from 'react-icons/bs';

const fromNewToOld = (post1, post2) => {
  return post2.timestamp - post1.timestamp;
};

export default function Posts({ category }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((posts) => {
      console.log(posts);
      setPosts(posts);
    });
  }, []);

  return (
    <PostsContainer>
      {posts &&
        posts
          .sort(fromNewToOld)
          .filter((post) => post.type === category)
          .map((post, i) => {
            switch (post.type) {
              case 'query':
                return (
                  <Animated
                    key={i}
                    animationIn="fadeInDown"
                    animationInDuration={500}
                    animationInDelay={i * 100}
                  >
                    <QueryPost post={post} />
                  </Animated>
                );
              case 'share':
                return (
                  <Animated
                    key={i}
                    animationIn="fadeInDown"
                    animationInDuration={500}
                  >
                    <SharePost post={post} />
                  </Animated>
                );
              default:
                return;
            }
          })}
      <WritePostButton to={`/form/${category}`}>
        <WritePostIcon />
      </WritePostButton>
    </PostsContainer>
  );
}

const PostsContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 70px;
  width: 100%;
`;

const WritePostIcon = styled(BsPencilSquare)`
  width: 50%;
  height: 50%;
  fill: ${theme.darkbrown};
`;

const WritePostButton = styled(Link)`
  display: block;
  width: 40px;
  height: 40px;
  position: fixed;
  right: 35px;
  bottom: calc(${footerConfig.mobile_height} + 10px);
  display: flex;
  justify-content: center;
  box-shadow: -1px 1px 5px -2px gray;
  align-items: center;
  background-color: ${theme.lightOrange};
  border-radius: 50%;

  &:hover {
    background-color: ${theme.darkbrown};
    transform: scale(1.2);
    & ${WritePostIcon} {
      fill: white;
    }
  }

  @media screen and (min-width: 769px) {
    bottom: 10px;
  }
`;
