import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../store/index'; // Correct path to your store file
import '../style/style.scss'; 
import defaultImage from '../img/no-image-available.png';

function Posts() {
  const { posts, fetchAllPosts } = useStore((state) => ({
    posts: state.posts,
    fetchAllPosts: state.fetchAllPosts,
  }));

  useEffect(() => {
    fetchAllPosts();
  }, []);
  return (
    <div className="posts-grid">
      {posts.map((post) => (
        <Link to={`/posts/${post.id}`} key={post.id} className="post-tile">
          <img src={post.coverUrl || defaultImage} alt={post.title} />
          <h3>{post.title}</h3>
          <p>{post.tags}</p>
        </Link>
      ))}
    </div>
  );
}

export default Posts;
