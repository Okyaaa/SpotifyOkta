import React from "react";
import "./CardSong.css";

type Parameter = {
  url: string;
  alt: string;
  artistName: string;
  trackName: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isSelected: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  nameOfButton: string;
  duration: number;
};

function millisToMinutesAndSeconds(time:number) {
  var minutes = Math.floor(time / 60000);
  let seconds = Math.round(((time % 60000) / 1000));
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function CardSong(props: Parameter) {
  return (
    <div className="Card">
      <img src={props.url} alt={props.alt} />
      <div className="text-component">
        <p className="track">{props.trackName}</p>
        <p className="artistName">{props.artistName}</p>
        <p className="duration">{props.duration ?  millisToMinutesAndSeconds(props.duration) : ""}</p>
      </div>
      <div className="button-component">
        <button
          className="buttonSelect"
          type="button"
          onClick={() => props.onClick(props.isSelected)}
        >
          {props.nameOfButton}
        </button>
      </div>
    </div>
  );
}

CardSong.defaultProps = {
  duration: "hello"
}

export default CardSong;
