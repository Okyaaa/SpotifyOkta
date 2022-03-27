import "./CardSong.css";

function CardSong(props) {
  return (
    <div className="Card">
      <img src={props.url} alt={props.alt}></img>
      <div className="text-component">
        <p className="album">{props.albumName}</p>
        <p>{props.artistName}</p>
      </div>
      <div className="button-component">
        <button
          className="buttonSelect"
          type="button"
          onclick="alert('Hello world!')"
        >
          Select
        </button>
      </div>
    </div>
  );
}

export default CardSong;
