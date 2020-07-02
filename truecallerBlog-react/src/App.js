import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import HomePage from './components/container/HomePage/HomePage';
import CategoryPage from './components/container/CategoryPage/CategoryPage';
import TagPage from './components/container/TagPage/TagPage';
import PostDetail from './components/container/postDetails/PostDetail';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/category/:slug" component={CategoryPage} />
        <Route exact path="/tag/:tag" component={TagPage} />
        <Route exact path="/posts/:postId" component={PostDetail} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
