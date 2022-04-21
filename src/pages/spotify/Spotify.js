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
import ModalComponent from "../../component/modals/Modal";
import useModals from "../../hooks/useModals";

function Spotify() {
  const { searchResult, handleChange, onSearch } = useSearch();
  const { song } = useNewRelease();
  const {
    handlePlaylist,
    handleForm,
    handleNotSelected,
    handleSelected,
    isLoggedOut,
    isSelected,
  } = useCreatePlaylist();
  const { showModal, handleOk, handleCancel } = useModals();

  const [pageNumber, setPageNumber] = useState(0);
  const dataPerPage = 6;
  const pageVisited = pageNumber * dataPerPage;
  const displayRelease = song
    .slice(pageVisited, pageVisited + dataPerPage)
    .map((item, index) => (
      <CardSong
        url={item.images[0].url}
        trackName={item.name}
        artistName={item.artists[0].name}
        alt="Image not loaded"
        key={item.uri}
        isSelected={isSelected.includes(item.uri)}
        onClick={(isSelect) =>
          isSelect ? handleSelected(item.uri) : handleNotSelected(item.uri)
        }
        nameOfButton={isSelected.includes(item.uri) ? "Deselect" : "Select"}
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
        isSelected={isSelected.includes(item.uri)}
        onClick={(isSelect) =>
          isSelect ? handleSelected(item.uri) : handleNotSelected(item.uri)
        }
        nameOfButton={isSelected.includes(item.uri) ? "Deselect" : "Select"}
      />
    ));
  const searchCount = Math.ceil(searchResult.length / dataPerPage);
  const releaseCount = Math.ceil(song.length / dataPerPage);
  const onChangePagination = (event, value) => {
    setPageNumber(value - 1);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="headerButton">
          <SearchForm onSearch={onSearch} handleChange={handleChange} />
          <button type="submit" onClick={() => <ModalComponent />}>
            create playlist
          </button>
          <button type="submit" onClick={() => console.log("view playlist")}>
            View playlist
          </button>
        </div>
        <button type="submit" onClick={isLoggedOut}>
          Logout
        </button>
      </div>
      {/* <div className="formAndView">
        <div className="create-playlist">
          <p className="createTitle">Create Playlist</p>
          <PlaylistForm
            onCreate={handlePlaylist}
            handleChangeTitle={handleForm}
            handleChangeDesc={handleForm}
          />
        </div>
      </div> */}
      <div className="bodySpotify">
        <div className="spotify-track">
          {searchResult.length === 0 ? (
            <div className="newRelease">
              <p className="searchTitle">New Release Song</p>
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
        <SongInformation
          url="https://media.giphy.com/media/3o6fJ16C3AG3ulbIdO/giphy.gif"
          alt="Hello"
          albumName="Adele"
          artistName="Adeleeee"
        />
      </div>
    </div>
  );
}

export default Spotify;
