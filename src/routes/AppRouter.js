import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Home from "../pages/home/Index";
import Spotify from "../pages/spotify/Spotify";
import { selectToken } from "../redux/auth-slice";
import { useSelector } from "react-redux";

function AppRouter() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const accessToken = useSelector(selectToken);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {!accessToken ? <Home /> : <Redirect to="/create-playlist" />}
        </Route>
        <Route path="/create-playlist">
          {!accessToken ? <Redirect exact to="/" /> : <Spotify />}
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/create-playlist">
          <Spotify />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
