import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store'; // Ensure this points to your Zustand store

function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const navigate = useNavigate();
  const createPost = useStore((state) => state.createPost);

  // used ChatGPT for to refresh label syntax 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const post = {
      title,
      content,
      tags, 
      coverUrl,
    };
    await createPost(post);
    navigate('/'); 
  };
  const cancel = async (e) => {
    navigate('/');
  };
  return (
    <div className="new-post-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title-input">
          Title:
          <input id="title-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label htmlFor="content">
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <label htmlFor="tags">
          Tags (comma-separated):
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
        </label>
        <label htmlFor="coverurl">
          Cover URL:
          <input type="text" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} />
        </label>
        <button type="submit">Create Post</button>
      </form>
      <button type="submit" onClick={cancel}>Cancel</button>
    </div>
  );
}

export default NewPost;
