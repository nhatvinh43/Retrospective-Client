import React from 'react';
import Homepage from './Views/Homepage/index';
import BoardDetails from './Views/BoardDetails/index';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";

function App()
{
  return (
    <div>
      <Switch>
        <Route path="/dashboard">
          <Homepage />
        </Route>
        <Route path="/board/:id">
          <BoardDetails />
        </Route>
        <Route path="/">
          <Redirect to="/dashboard" />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
