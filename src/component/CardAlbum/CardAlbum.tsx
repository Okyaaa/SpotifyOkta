import React from "react";
import "../cardSong/CardSong.css";

type Parameter = {
  url: string;
  alt: string;
  artistName: string;
  trackName: string;
};


function CardAlbum(props: Parameter) {
  return (
    <div className="Card">
      <img src={props.url} alt={props.alt} />
      <div className="text-component">
        <p className="track">{props.trackName}</p>
        <p className="artistName">{props.artistName}</p>
      </div>
    </div>
  );
}

export default CardAlbum;
