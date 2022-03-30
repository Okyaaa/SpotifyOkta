import CardSong from "../../component/CardSong";
import "./Home.css";
import data from "../../data/data.js";

function Index() {
  return (
    <div className="card-song">
      {data.map((item, indx) => {
        return (
          <CardSong
            url={item.album.images[0].url}
            albumName={item.album.name}
            artistName={item.artists[0].name}
            alt="Image not loaded"
            key={indx}
          />
        );
      })}
    </div>
  );
}

export default Index;
