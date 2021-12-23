import React from "react";

function Display({ input, result }) {
  return (
    <div className="output-container">
      <div className="result">{result}</div>
      <div id="display" className="input">
        {input}
      </div>
    </div>
  );
}

export default Display;
