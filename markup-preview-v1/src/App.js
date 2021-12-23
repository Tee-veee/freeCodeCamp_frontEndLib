import "./App.css";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [markdown, setMarkdown] = useState("Enter markdown:)");
  const [mainColor, setMainColor] = useState("#333333");
  const [accentColor, setAccentColor] = useState("#BABABA");
  const [accentColorTwo, setAccentColorTwo] = useState("#C6C6C6");
  const [isDarkMode, setisDarkMode] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const HIDDEN = "hidden";

  function checkHidden() {
    let el1 = document.getElementById("editor");
    let el2 = document.getElementById("preview-container");
    if (isHidden) {
      el1.classList.remove(HIDDEN);
      el2.classList.remove(HIDDEN);
      setIsHidden(false);
      return;
    }
    el1.classList.add(HIDDEN);
    el2.classList.add(HIDDEN);
    setIsHidden(true);
    return;
  }

  function isDarkModeActive() {
    if (isDarkMode === true) {
      setMainColor("CornflowerBlue");
      setAccentColor("#BBFEFA");
      setAccentColorTwo("white");
      setisDarkMode(false);
      return;
    }
    setMainColor("#333333");
    setAccentColor("#BABABA");
    setAccentColorTwo("#C6C6C6");
    setisDarkMode(true);
    return;
  }

  return (
    <div id="main-container" style={{ backgroundColor: mainColor }}>
      <div id="editor-container">
        <div
          id="editor-header"
          style={{ backgroundColor: accentColor, color: mainColor }}
        >
          <h4>Text editor</h4>
          <div id="editor-icons-container">
            <FontAwesomeIcon
              id="dark-mode"
              onClick={isDarkModeActive}
              icon={faMoon}
            />
            <FontAwesomeIcon
              id="minimise-editor1"
              icon={faTimes}
              onClick={() => checkHidden()}
            />
          </div>
        </div>
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          id="editor"
          style={{ backgroundColor: accentColorTwo }}
        />
      </div>
      <div id="preview-container" style={{ backgroundColor: accentColorTwo }}>
        <div
          id="preview-header"
          style={{ backgroundColor: accentColor, color: mainColor }}
        >
          <h4>Converted markdown</h4>
        </div>
        <ReactMarkdown children={markdown} className="markdown-text" />
      </div>
    </div>
  );
}

export default App;
