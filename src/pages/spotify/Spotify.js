import "./Spotify.css";
import React, { useEffect, useState } from "react";
import useSearch from "../../hooks/useSearch";
import SearchForm from "../../component/searchForm/SearchForm";
import CardSong from "../../component/cardSong/CardSong";
import PlaylistForm from "../../component/playlistForm/playlistForm";
import useCreatePlaylist from "../../hooks/useCreatePlaylist";
import Pagination from "@mui/material/Pagination";
import SongInformation from "../../component/songInformation/SongInformation";
import useNewRelease from "../../hooks/useNewRelease";
import DialogComponent from "../../component/dialog/Dialog";
import CardSongNoButton from "../../component/CardAlbum/CardAlbum";
import userPlaylist from "../../api/services/spotify/userPlaylist";
import { useDispatch, useSelector } from "react-redux";
import { selectData, addUserId } from "../../redux/auth-slice";
import getUserId from "../../api/services/spotify/user";
import UserPlaylist from "../../component/UserPlaylist/UserPlaylist";
import currentlyPlaying from "../../api/services/spotify/currentlyPlaying";
import recentlyPlaying from "../../api/services/spotify/recentlyPlayed";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipPrevious from "@mui/icons-material/SkipPrevious";
import SkipNext from "@mui/icons-material/SkipNext";
import VolumeUp from "@mui/icons-material/VolumeUp";

function Spotify() {
  const accessToken = useSelector(selectData);
  const dispatch = useDispatch();
  const { searchResult, handleChange, onSearch } = useSearch();
  const [currentSong, setCurrentSong] = useState({});
  const [recentlySong, setRecentlySong] = useState({});
  const { song } = useNewRelease();
  const {
    handlePlaylist,
    handleForm,
    handleNotSelected,
    handleSelected,
    isLoggedOut,
    isSelected,
  } = useCreatePlaylist();

  const [pageNumber, setPageNumber] = useState(0);
  const dataPerPage = 6;
  const pageVisited = pageNumber * dataPerPage;
  const displayRelease = song
    .slice(pageVisited, pageVisited + dataPerPage)
    .map((item, index) => (
      <CardSongNoButton
        url={item.images[0].url}
        trackName={item.name}
        artistName={item.artists[0].name}
        alt="Image not loaded"
        key={item.uri}
      />
    ));
  const displaySearch = searchResult
    .slice(pageVisited, pageVisited + dataPerPage)
    .map((item, index) => (
      <CardSong
        url={item.album.images[0].url}
        trackName={item.name}
        artistName={item.artists[0].name}
        duration={item.duration_ms}
        alt="Image not loaded"
        key={item.uri}
        isSelected={accessToken.trackId.includes(item.uri)}
        onClick={(isSelect) =>
          isSelect ? handleSelected(item.uri) : handleNotSelected(item.uri)
        }
        nameOfButton={
          accessToken.trackId.includes(item.uri) ? "Deselect" : "Select"
        }
      />
    ));
  const searchCount = Math.ceil(searchResult.length / dataPerPage);
  const releaseCount = Math.ceil(song.length / dataPerPage);
  const onChangePagination = (event, value) => {
    setPageNumber(value - 1);
  };
  useEffect(() => {
    getUserId(process.env.REACT_APP_SPOTIFY_URL, accessToken.value).then(
      (response) => {
        dispatch(addUserId(response.id));
      }
    );
    currentlyPlaying(process.env.REACT_APP_SPOTIFY_URL, accessToken.value).then(
      (response) => {
        setCurrentSong(response);
      }
    );
    recentlyPlaying(process.env.REACT_APP_SPOTIFY_URL, accessToken.value).then(
      (response) => {
        console.log(response);
        setRecentlySong(response);
      }
    );
  }, []);
  return (
    <div className="container">
      <div className="header">
        <div className="headerButton">
          <SearchForm onSearch={onSearch} handleChange={handleChange} />
          <div className="createPlaylist">
            <DialogComponent
              title="Create Playlist"
              buttonName="Create Playlist"
              component={
                <PlaylistForm
                  onCreate={handlePlaylist}
                  handleChangeTitle={handleForm}
                  handleChangeDesc={handleForm}
                />
              }
            />
          </div>
          <div className="View Playlist">
            <DialogComponent
              title="User Playlist"
              buttonName="View Playlist"
              component={<UserPlaylist />}
            />
          </div>
        </div>

        <button type="submit" onClick={isLoggedOut}>
          Logout
        </button>
      </div>
      <div className="bodySpotify">
        <div className="spotify-track">
          {searchResult.length === 0 ? (
            <div className="newRelease">
              <p className="searchTitle">New Release Album</p>
              <div className="listOf-track">{displayRelease}</div>
              <div className="pagination">
                <Pagination
                  color="primary"
                  variant="text"
                  count={releaseCount}
                  onChange={onChangePagination}
                  showFirstButton
                  showLastButton
                />
              </div>
            </div>
          ) : (
            <div className="searchResult">
              <p className="searchTitle">Search Result</p>
              <div className="listOf-track">{displaySearch}</div>
              <div className="pagination">
                <Pagination
                  color="primary"
                  variant="text"
                  count={searchCount}
                  onChange={onChangePagination}
                  showFirstButton
                  showLastButton
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="playBar">
        <div className="playBarComponent">
          <SongInformation
            url={recentlySong[0]?.track.album.images[0].url}
            alt="not loaded"
            trackName={recentlySong[0]?.track.name}
            artistName={recentlySong[0]?.track.artists[0].name}
          />
          <div>
            <IconButton aria-label="skip-previous">
              <SkipPrevious style={{ color: "white" }} />
            </IconButton>
            <IconButton aria-label="play-arrow">
              <PlayArrowIcon style={{ color: "white" }} />
            </IconButton>
            <IconButton aria-label="skip-next">
              <SkipNext style={{ color: "white" }} />
            </IconButton>
          </div>
          <div>
            <IconButton aria-label="skip-next">
              <VolumeUp style={{ color: "white" }} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Spotify;
