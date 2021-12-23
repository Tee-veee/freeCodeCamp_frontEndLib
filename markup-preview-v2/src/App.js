import { marked } from "marked";
import { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

const renderer = new marked.Renderer();
const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.


There's also [links](https://www.freecodecamp.org), and
> Block Quotes!


And if you want to get really crazy, even tables:


Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.


- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


        
1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![radnomSvg Logo](https://icons-for-free.com/iconfiles/png/512/svg+graph+office+overview+part+pie+chart+portion+icon-1320185160787248180.png)
`;

function App() {
  const [currentText, setCurrentText] = useState(placeholder);
  const [isDarkMode, setDarkMode] = useState(false);
  const [colorPrimary, setColorPrimary] = useState("khaki");
  const [colorSecondary, setColorSecondary] = useState("orange");
  const [colorThird, setColorThird] = useState("white");
  const [colorTextPrimary, setTextPrimary] = useState("black");

  const handleTextAreaChange = (event) => {
    setCurrentText(event.target.value);
  };

  const checkDarkMode = () => {
    if (isDarkMode) {
      setColorPrimary("khaki");
      setColorSecondary("orange");
      setTextPrimary("black");
      setColorThird("white");
      setDarkMode(false);
      return;
    } else {
      setColorPrimary("gray");
      setColorSecondary("black");
      setTextPrimary("white");
      setColorThird("darkgray");
      setDarkMode(true);
      return;
    }
  };

  return (
    <div id="main-container" style={{ backgroundColor: colorPrimary }}>
      <div id="editor-container">
        <header
          id="editor-header"
          style={{ backgroundColor: colorSecondary, color: colorTextPrimary }}
        >
          <h3>Markdown writer!</h3>
          <FontAwesomeIcon
            id="dark-mode"
            icon={faMoon}
            onClick={checkDarkMode}
          />
        </header>
        <Textarea
          text={currentText}
          textChange={handleTextAreaChange}
          style={{ backgroundColor: colorThird, color: colorTextPrimary }}
        />
      </div>

      <div id="preview-container" style={{ backgroundColor: colorThird }}>
        <header
          id="preview-header"
          style={{ backgroundColor: colorSecondary, color: colorTextPrimary }}
        >
          <h3>Markdown reader!</h3>
        </header>
        <Preview markdown={currentText} style={{ color: colorTextPrimary }} />
      </div>
    </div>
  );
}

export default App;

function Textarea({ text, textChange, style }) {
  return (
    <textarea
      id="editor"
      name="text"
      value={text}
      onChange={textChange}
      style={style}
    ></textarea>
  );
}

function Preview({ markdown, style }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: marked(markdown, { renderer: renderer }),
      }}
      id="preview"
      style={style}
    ></div>
  );
}
