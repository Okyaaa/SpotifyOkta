import CardSong from "../../component/CardSong";
import "./Home.css";

function Index()  {
    return (
      <div className="Home" >
        <h1>Exercise</h1>
        <div className="searchBar" >
          <input type="search" id="search" name="search"></input>
          <input type="submit"></input>
        </div>
        <img src="https://media.giphy.com/media/Vh8pbGX3SGRwFDh3V0/source.gif"></img>
      </div>
    );
}

export default Index;
