import "../spotify/Spotify.css";
import CardSong from "../../component/CardSong";
import useSearch from "../../hooks/useSearch";
import { useState } from "react";

const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = "http://localhost:3000/callback/";
const SCOPE = "playlist-modify-private";
const AUTH_URL = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=token&show_dialog=true`;

function Spotify() {
  const {
    searchResult,
    handleChange,
    onSearch,
  } = useSearch();

  const [isSelected, setIsSelected] = useState([]);

  return (
    <div className="spotify-track">
      <form onSubmit={onSearch}>
        <a className="title" href={AUTH_URL}>
          Click this text to Login
        </a>
        <input type="text" id="inpuText" onChange={handleChange} />
        <button type="submit" value="submit">
          Search
        </button>
      </form>
      <div className="listOf-track">
        {searchResult.map((item, index) => (
          <CardSong
            url={item.album.images[0].url}
            albumName={item.album.name}
            artistName={item.artists[0].name}
            alt="Image not loaded"
            key={item.uri}
            isSelected={isSelected.includes(item.uri)}
            onClick={(isSelected) => isSelected ? setIsSelected(oldArray => oldArray.filter((id) => id !== item.uri)) : setIsSelected(oldArray => [...oldArray, item.uri])}
            nameOfButton={isSelected.includes(item.uri) ? "Deselect" : "Select"}
          />
        ))
        }
      </div>
    </div>
  );
}

export default Spotify;
