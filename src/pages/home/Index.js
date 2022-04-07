import "./Home.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveToken } from "../../redux/token-actions";

function Home() {
  const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000/create-playlist";
  const SCOPE = "playlist-modify-private";
  const AUTH_URL = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=token&show_dialog=true`;

  const isAuth = () => {
    window.location = AUTH_URL;
    localStorage.setItem("isLoggedIn", true);
  };

  return (
    <div className="Home">
      <p className="title">Klik button dibawah untuk login bestie &#129409;</p>
      <button onClick={isAuth}>Click here to login</button>
    </div>
  );
}

export default Home;
