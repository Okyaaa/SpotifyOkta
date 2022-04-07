import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Home from "../pages/home/Index";
import Spotify from "../pages/spotify/Spotify";

function AppRouter() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  console.log(isLoggedIn);
  return (
    <Router>
      <Switch>
        <Route path="/create-playlist">
          {isLoggedIn ? (
            <Spotify />
          ) : (
            <Redirect exact from="/create-playlist" to="/" />
          )}
        </Route>
        <Route exact path="/">
          <Home></Home>
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
