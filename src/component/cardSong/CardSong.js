import React from "react";
import "./CardSong.css";

function CardSong(props) {
  const {
    url, alt, albumName, artistName, onClick, isSelected, nameOfButton,
  } = props;
  return (
    <div className="Card">
      <img src={url} alt={alt} />
      <div className="text-component">
        <p className="album">{albumName}</p>
        <p>{artistName}</p>
      </div>
      <div className="button-component">
        <button
          className="buttonSelect"
          type="button"
          onClick={() => onClick(isSelected)}
        >
          {nameOfButton}
        </button>
      </div>
    </div>
  );
}

export default CardSong;
