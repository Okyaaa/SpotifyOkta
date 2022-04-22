import React from "react";
import "./songInfo.css";
type Parameter = {
  url: string,
  alt: string,
  id:string,
  artistName: string,
  trackName: string;
};

const SongInformation = (props: Parameter) => {
  return (
    <div className="songInformation">
      <img src={props.url} alt={props.alt} className="songImage"/>
      <div className="text-component">
        <p className="track">{props.trackName}</p>
        <p>{props.artistName}</p>
      </div>
    </div>
  );
};

export default SongInformation;
