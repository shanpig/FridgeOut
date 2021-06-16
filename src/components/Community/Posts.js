import QueryPost from './QueryPost';
import SharePost from './SharePost';

import { useState, useEffect } from 'react';

import styled from 'styled-components';
import { v1 as uid } from 'uuid';
import { Animated } from 'react-animated-css';

import { getPosts } from '../../utils/firebase';

const fromNewToOld = (post1, post2) => {
  return post2.timestamp - post1.timestamp;
};

export default function Posts({ category }) {
  const [posts, setPosts] = useState([]);

  function postsOfCategory(category) {
    return (post) => post.type === category;
  }

  useEffect(() => {
    let subscribed = true;

    getPosts().then((posts) => {
      if (!subscribed) return;
      setPosts(posts);
    });

    return () => (subscribed = false);
  }, []);

  return (
    <PostsContainer>
      {posts &&
        posts
          .sort(fromNewToOld)
          .filter(postsOfCategory(category))
          .map((post, i) => {
            return (
              <Animated
                key={uid()}
                animationIn="fadeInDown"
                animationInDuration={500}
                animationInDelay={i * 100}
              >
                {category === 'query' ? (
                  <QueryPost post={post} />
                ) : (
                  <SharePost post={post} />
                )}
              </Animated>
            );
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
