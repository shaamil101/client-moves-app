/* eslint-disable react/function-component-definition */
import React from 'react';
import './style.scss'; 
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter, Routes, Route, NavLink, useParams,
} from 'react-router-dom';
import Counter from './components/counter';
import Controls from './components/controls';

const About = (props) => {
  return <div> All there is to know about me </div>;
};
const Welcome = (props) => {
  return <div>Welcome <Counter /> <Controls /> </div>;
};
const Test = (props) => {
  const { id } = useParams();
  return <div> ID: {id} </div>;
};
const FallBack = (props) => {
  return <div>URL Not Found</div>;
};
const App = (props) => {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/about" element={<About />} />
          <Route path="/test/:id" element={<Test />} />
          <Route path="*" element={<FallBack />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
 
const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/test/id1">test id1</NavLink></li>
        <li><NavLink to="/test/id2">test id2</NavLink></li>
      </ul>
    </nav>
  );
}; 

const root = createRoot(document.getElementById('main'));
root.render(<App />);
