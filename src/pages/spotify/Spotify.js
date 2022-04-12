import "./Spotify.css";
import React, { useState } from "react";
import useSearch from "../../hooks/useSearch";
import SearchForm from "../../component/searchForm/SearchForm";
import CardSong from "../../component/cardSong/CardSong";
import PlaylistForm from "../../component/playlistForm/playlistForm";
import PlaylistCard from "../../component/playlistCard/playlistCard";
import useCreatePlaylist from "../../hooks/useCreatePlaylist";

function Spotify() {
  const { searchResult, handleChange, onSearch } = useSearch();
  const {
    handlePlaylist,
    handleForm,
    handleNotSelected,
    handleSelected,
    isLoggedOut,
    handleView,
    newPlaylist,
    check,
    isSelected,
  } = useCreatePlaylist();

  return (
    <div className="container">
      <div className="header">
        <SearchForm onSearch={onSearch} handleChange={handleChange} />
        <button type="submit" onClick={isLoggedOut}>
          Logout
        </button>
      </div>

      <div className="formAndView">
        <div className="create-playlist">
          <p className="createTitle">Create Playlist</p>
          <PlaylistForm
            onCreate={handlePlaylist}
            handleChangeTitle={handleForm}
            handleChangeDesc={handleForm}
          />
        </div>
        {/* <div className="viewPlaylist">
          <button type="submit" onClick={handleView}>
            View Playlist
          </button>
        </div> */}
      </div>
      <div className="spotify-track">
        <p className="searchTitle">Search Result</p>
        {searchResult.length === 0 ? (
          <p className="emptyResult">No result</p>
        ) : (
          <div className="listOf-track">
            {searchResult.map((item) => (
              <CardSong
                url={item.album.images[0].url}
                albumName={item.album.name}
                artistName={item.artists[0].name}
                alt="Image not loaded"
                key={item.uri}
                isSelected={isSelected.includes(item.uri)}
                onClick={(isSelect) =>
                  isSelect
                    ? handleSelected(item.uri)
                    : handleNotSelected(item.uri)
                }
                nameOfButton={
                  isSelected.includes(item.uri) ? "Deselect" : "Select"
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Spotify;
