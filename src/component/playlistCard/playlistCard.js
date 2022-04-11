import React from "react";
import "./PlaylistCard.css";

function PlaylistCard(props) {
  const {
    url, alt, albumName, artistName,
  } = props;
  return (
    <div className="Card">
      <img src={url} alt={alt} />
      <div className="text-component">
        <p className="album">{albumName}</p>
        <p>{artistName}</p>
      </div>
    </div>
  );
}

export default PlaylistCard;
