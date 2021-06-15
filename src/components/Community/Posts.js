import styled from 'styled-components';
import { useState, useEffect } from 'react';
import QueryPost from './QueryPost';
import SharePost from './SharePost';
import { getPosts } from '../../utils/firebase';
import { Animated } from 'react-animated-css';
import { v1 as uid } from 'uuid';

const fromNewToOld = (post1, post2) => {
  return post2.timestamp - post1.timestamp;
};

export default function Posts({ category }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let subscribed = true;
    getPosts().then((posts) => {
      console.log(posts);
      if (!subscribed) return;
      setPosts(posts);
    });

    return () => {
      subscribed = false;
    };
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
                    key={uid()}
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
                    key={uid()}
                    animationIn="fadeInDown"
                    animationInDuration={500}
                    animationInDelay={i * 100}
                  >
                    <SharePost post={post} />
                  </Animated>
                );
              default:
                return;
            }
          })}
    </PostsContainer>
  );
}

const PostsContainer = styled.div`
  position: relative;
  display: grid;
  gap: 70px 30px;
  width: 100%;

  @media screen and (min-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
