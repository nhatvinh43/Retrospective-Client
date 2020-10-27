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
        <Route exact path="/dashboard">
          <Homepage />
        </Route>
        <Route exact path="/board/:id">
          <BoardDetails />
        </Route>
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
