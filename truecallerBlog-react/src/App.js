import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory, Redirect } from 'react-router-dom';

import './App.css';
import HomePage from './components/container/HomePage/HomePage';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/posts/:postId" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
