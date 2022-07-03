import React from "react";
import MusicPlayer from "./components/Features/MusicPlayer/MusicPlayer";
import Router from "./Router";

function App() {
  return (
    <div data-theme={"light"}>
      <Router />
      <MusicPlayer />
    </div>
  );
}

export default App;
