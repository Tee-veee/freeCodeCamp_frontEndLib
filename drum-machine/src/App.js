import "./App.css";
import React, { useState } from "react";
import Drum from "./Drum";
import Data from "./Data";

function App() {
  const [volume, setVolume] = useState(1);
  const [displayText, setDisplayText] = useState("");

  return (
    <main className="main-container">
      <div id="drum-machine">
        <div id="display-grid">
          {Data.map((audioItem) => {
            return (
              <Drum
                key={audioItem.id}
                audioItem={audioItem}
                volume={volume}
                setDisplayText={setDisplayText}
              />
            );
          })}
        </div>
        <input
          type="range"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          max="1"
          min="0"
          className="volume-input"
        />
        <div id="display">
          <h3>{displayText}</h3>
        </div>
      </div>
    </main>
  );
}

export default App;
