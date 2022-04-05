import { Provider } from "react-redux";
import "./App.css";
import Spotify from "./pages/spotify/Spotify";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Spotify />
      </div>
    </Provider>
  );
}

export default App;
