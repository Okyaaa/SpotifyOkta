import "./Home.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authentication } from "../../redux/auth-actions";
import { addToken, isLoggedIn } from "../../redux/auth-slice";

function Home() {
  const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000/create-playlist";
  const SCOPE = "playlist-modify-private";
  const AUTH_URL = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=token&show_dialog=true`;
  // const isLogged = useSelector((state) => state.auth.isLoggedIn); 
  // const dispatch = useDispatch();

  const isAuth = () => {
    window.location = AUTH_URL;
    localStorage.setItem("isLoggedIn", true);
  };

  
  return (
    <div className="Home">
      <div className="header"></div>
      <div className="content">
        <p className="title">
          Klik button dibawah untuk login bestie &#129409;
        </p>
        <button type="submit" onClick={isAuth}>
          Click here to login
        </button>
      </div>
      <div className="footer">
        <p className="watermark">
          Love &#128150; peace &#9996; and gawl &#129305; by Okta
        </p>
      </div>
    </div>
  );
}

export default Home;
