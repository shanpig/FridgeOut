import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import QueryPost from './QueryPost';
import SharePost from './SharePost';
import { getPosts } from '../../utils/firebase';
import { Animated } from 'react-animated-css';

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
    </PostsContainer>
  );
}

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
