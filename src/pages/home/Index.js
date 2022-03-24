import CardSong from "../../component/CardSong";
import "./Home.css";
import data from "../../data/data.js";

function Index()  {
    return (
      <CardSong 
        url={data.album.images[0].url}
        albumName={data.album.name}
        artistsName={data.album.artists[0].name}
      />
    );
}

export default Index;
