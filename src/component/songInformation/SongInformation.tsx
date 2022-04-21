import React from "react";
import "./songInfo.css";
type Parameter = {
  url: string;
  alt: string;
  artistName: string;
  albumName: string;
};

const SongInformation = (props: Parameter) => {
  return (
    <div className="songInformation">
      <img src={props.url} alt={props.alt} className="songImage"/>
      <div className="text-component">
        <p className="album">{props.albumName}</p>
        <p>{props.artistName}</p>
      </div>
    </div>
  );
};

export default SongInformation;
