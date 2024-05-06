import React from 'react';
import '../style/style.scss';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter, Routes, Route, NavLink,
} from 'react-router-dom';
import Posts from './Posts';
import NewPost from './NewPost';
import Post from './Post';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts/new" element={<NewPost />} />
          <Route path="/posts/:postID" element={<Post />} />
          <Route path="*" element={<div>post not found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Nav() {
  return (
    <nav className="navbar">
      <NavLink to="/">
        <button type="button" className="new-post-btn">All experiences</button>
      </NavLink>
      <div className="navbar-center">
        <h1>Lokal</h1>
        <p>Local tour guides, local experiences</p>
      </div>
      <NavLink to="/posts/new">
        <button type="button" className="new-post-btn">Post experience</button>
      </NavLink>
    </nav>
  );
}

const root = createRoot(document.getElementById('main'));
root.render(<App />);
