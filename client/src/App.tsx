import React from "react";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import Router from "./components/Router";

function App() {
  return (
    <div data-theme={"winter"}>
      <Router />
      <MusicPlayer />
    </div>
  );
}

export default App;
