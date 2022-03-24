import './CardSong.css';
import data from '../data/data.js'

function CardSong(props)  {
    return (
      <div className="Card">
        <img src={props.url} alt={props.alt}></img>
        <div className="text-component" >
          <p>{props.albumName}</p>
          <p>{props.artistName}</p>
        </div>
        <div className='button-component'>
          <button className='buttonSelect' type="button" onclick="alert('Hello world!')">Select</button>
        </div>
      </div>
    );

    
}

export default CardSong;