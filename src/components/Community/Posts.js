import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import QueryPost from './QueryPost';
import SharePost from './SharePost';
import { getPosts } from '../../utils/firebase';

const fromNewToOld = (post1, post2) => {
  return post2.timestamp - post1.timestamp;
};

export default function Posts() {
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
        posts.sort(fromNewToOld).map((post, i) => {
          switch (post.type) {
            case 'query':
              return <QueryPost key={i} post={post} />;
            case 'share':
              return <SharePost key={i} post={post} />;
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
`;
