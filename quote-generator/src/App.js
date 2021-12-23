import "./App.css";
import COLORS from "./colors";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";

const QUOTE_DB =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState("abc-defg");
  const [author, setAuthor] = useState("J.R.R Tolkien");
  const [randomNumber, setRandomNumber] = useState(0);
  const [quotesArr, setQuotesArr] = useState(null);
  const [mainColor, setMainColor] = useState("black");

  const fetchQuotes = async (QUOTE_DB) => {
    const response = await fetch(QUOTE_DB);
    const parsedJSON = await response.json();
    setQuotesArr(parsedJSON.quotes);
    console.log(parsedJSON);
  };

  useEffect(() => {
    fetchQuotes(QUOTE_DB);
  });

  const randomNumberGen = () => {
    let randomNumberQuote = Math.floor(Math.random() * quotesArr.length);
    setMainColor(COLORS[randomNumber]);
    setRandomNumber(randomNumberQuote);
    setQuote(quotesArr[randomNumber].quote);
    setAuthor(quotesArr[randomNumber].author);
    let mainContainer = document.querySelector(".main-container");
    mainContainer.style.backgroundColor = "blue";
  };

  return (
    <div className="App">
      <header className="main-container" style={{ backgroundColor: mainColor }}>
        <div id="quote-box" style={{ color: mainColor }}>
          <p id="text">"{quote}"</p>
          <p id="author">-{author}</p>
          <div id="button-box">
            <a
              href={encodeURI(
                `http://www.twitter.com/intent/tweet?text=${author}-${quote}`
              )}
              id="tweet-quote"
            >
              <FontAwesomeIcon
                id="twitter-icon"
                style={{ color: mainColor }}
                icon={faTwitterSquare}
              />
            </a>

            <button
              id="new-quote"
              onClick={() => randomNumberGen()}
              style={{ backgroundColor: mainColor }}
            >
              New Quote!
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
