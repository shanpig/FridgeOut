import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import QueryPost from './QueryPost';
import { getPosts } from '../utils/firebase';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((posts) => {
      console.log(posts);
      setPosts(posts);
    });
  }, []);

  return (
    <div className='posts'>
      {posts &&
        posts.map((post, i) => {
          // switch (post.type) {
          //   case 'query':
          //     return <QueryPost key={i} post={post} />;
          //   case 'share':
          //     return <></>;
          //   default:
          //     return <></>;
          // }
          if (post.type === 'query') {
            console.log(post);
            return <QueryPost key={i} post={post} />;
          }
        })}
    </div>
  );
}
