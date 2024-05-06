/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactMarkdown from 'react-markdown';
import useStore from '../store';
import '../style/Post.scss'; 
import defaultImage from '../img/no-image-available.png';

function Post() {
  const { postID } = useParams();
  const navigate = useNavigate();
  const deletePost = useStore((state) => state.deletePost);
  const { fetchPost, updatePost } = useStore((state) => ({
    fetchPost: state.fetchPost,
    updatePost: state.updatePost,
  }));
  const [post, setPost] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchPost(postID).then((data) => setPost(data));
  }, [postID, fetchPost]);

  if (!post) return <div className="loading">Loading...</div>;

  return (
    <div className="post-container">
      {editMode ? renderEditView() : renderReadOnlyView()}
    </div>
  );

  function renderReadOnlyView() {
    const handleClick = async () => {
      await deletePost(post.id);
      navigate('/'); 
    };

    return (
      <div className="post-content">
        <h1>{post.title}</h1>
        <img className="cover-image" src={post.coverUrl || defaultImage} alt={post.title} />
        <div className="tags">{post.tags}</div>
        <ReactMarkdown className="markdown-content">{post.content}</ReactMarkdown>
        <div className="button-group">
          <button type="button" onClick={() => setEditMode(true)}>Edit</button>
          <button type="button" onClick={() => handleClick()}>Delete</button>
        </div>
      </div>
    );
  }

  function renderEditView() {
    const handleInputChange = (e) => {
      setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      await updatePost(post);
      setEditMode(false);
      navigate(`/posts/${post.id}`); 
    };

    return (
      <form onSubmit={handleSubmit} className="edit-form">
        <input
          name="title"
          value={post.title}
          onChange={handleInputChange}
          className="form-input title-input"
        />
        <input
          name="tags"
          value={post.tags}
          onChange={handleInputChange}
          className="form-input tags-input"
        />
        <textarea
          name="content"
          value={post.content}
          onChange={handleInputChange}
          className="form-input content-textarea"
        />
        <input
          name="coverUrl"
          value={post.coverUrl}
          onChange={handleInputChange}
          className="form-input cover-input"
        />
        <div className="button-group">
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      </form>
    );
  }
}

export default Post;
