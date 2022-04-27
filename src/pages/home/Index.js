import "./Home.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToken,
  addUserId,
  isLogin,
  selectData,
} from "../../redux/auth-slice";
import tapeImage from "../../assets/home/tape.png";
import { Route, Redirect, Link } from "react-router-dom";
import Spotify from "../spotify/Spotify";
import getUserId from "../../api/services/spotify/user";

function Home() {
  const SPOTIFY_AUTHORIZE_ENDPOINT = process.env.REACT_APP_ENDPOINT;
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT;
  const SCOPE = [
    "playlist-modify-private",
    "user-read-currently-playing",
    "user-read-recently-played",
    "playlist-read-private"
  ];
  const AUTH_URL = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=token&show_dialog=true`;
  const dispatch = useDispatch();
  const getToken = new URLSearchParams(window.location.hash).get(
    "#access_token"
  );
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isAuth = () => {
    window.location = AUTH_URL;
    localStorage.setItem("isLoggedIn", true);
  };

  useEffect(() => {
    dispatch(addToken(getToken));
  }, []);

  return (
    <div className="Home">
      <div className="centerImage">
        <img className="tapeImage" src={tapeImage} />
      </div>
      <div className="content">
        <div className="title-ofContent">
          <p className="titleHome">Spotify</p>
          <p className="titleHomeChild">but its 90's</p>
          <p className="titleDescription">
            Listening to your favourite musics,
            <br /> don’t be mad, let it flow, be happy <br /> and have fun :D
          </p>
        </div>
        <button className="buttonLogin" type="submit" onClick={isAuth}>
          Click here to login
        </button>
      </div>
      <div className="footer">
        <div className="watermark">
          <p>Love &#128150; peace &#9996; and gawl &#129305; by Okta</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
