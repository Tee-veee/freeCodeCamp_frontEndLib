import "./App.css";
import React, { useState, useEffect } from "react";
import Display from "./Display";
import Keyboard from "./Keyboard";

export const data = [
  {
    id: "clear",
    value: "AC",
  },
  {
    id: "divide",
    value: "/",
  },
  {
    id: "multiply",
    value: "*",
  },
  {
    id: "seven",
    value: 7,
  },
  {
    id: "eight",
    value: 8,
  },
  {
    id: "nine",
    value: 9,
  },
  {
    id: "subtract",
    value: "-",
  },
  {
    id: "four",
    value: 4,
  },
  {
    id: "five",
    value: 5,
  },
  {
    id: "six",
    value: 6,
  },
  {
    id: "add",
    value: "+",
  },
  {
    id: "one",
    value: 1,
  },
  {
    id: "two",
    value: 2,
  },
  {
    id: "three",
    value: 3,
  },
  {
    id: "equals",
    value: "=",
  },
  {
    id: "zero",
    value: 0,
  },
  {
    id: "decimal",
    value: ".",
  },
];
const operands = ["AC", "/", "*", "+", "-", "="];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function App() {
  // input state
  const [input, setInput] = useState("0");
  // holds the result/output data
  const [result, setResult] = useState("");
  // holds data to perform calculations on
  const [calcData, setCalcData] = useState("");

  const handleCalc = () => {
    const totalSum = eval(calcData);
    setInput(`${totalSum}`);
    setResult(`${totalSum}`);
    setCalcData(`${totalSum}`);
  };

  const handleClear = () => {
    setInput("0");
    setResult("");
    setCalcData("");
  };

  const handleNums = (value) => {
    if (calcData.length === 0) {
      setInput(`${value}`);
      setCalcData(`${value}`);
    } else {
      if (value === 0 && (calcData === "0" || input === "0")) {
        setCalcData(`${calcData}`);
      } else {
        const lastChar = calcData.charAt(calcData.length - 1);
        const isLastCharOperand = operands.includes(lastChar);
        setInput(isLastCharOperand ? `${value}` : `${input}${value}`);
        setCalcData(`${calcData}${value}`);
      }
    }
  };
  const handleDecimal = () => {
    const lastChar = calcData.charAt(calcData.length - 1);
    if (calcData.length === 0) {
      setInput("0.");
      setCalcData("0.");
    } else {
      if (operands.includes(lastChar)) {
        setInput("0.");
        setCalcData("0.");
      } else {
        setInput(
          lastChar === "." || input.includes(".") ? `${input}` : `${input}.`
        );
        const formattedValue =
          lastChar === "." || input.includes(".")
            ? `${calcData}`
            : `${calcData}.`;
        setCalcData(formattedValue);
      }
    }
  };

  const handleOperator = (value) => {
    if (calcData.length) {
      setInput(`${value}`);

      const lastChar = calcData.charAt(calcData.length - 1);
      const secondLastChar = calcData.charAt(calcData.length - 2);

      const isLastCharOperand = operands.includes(lastChar);
      const isSecondLastCharOperand = operands.includes(secondLastChar);

      if (
        (isLastCharOperand && value !== "-") ||
        (isLastCharOperand && isSecondLastCharOperand)
      ) {
        if (isSecondLastCharOperand) {
          const newValue = `${calcData.substring(
            0,
            calcData.length - 2
          )}${value}`;
          setCalcData(newValue);
        } else {
          setCalcData(`${calcData.substring(0, calcData.length - 1)}${value}`);
        }
      } else {
        setCalcData(`${calcData}${value}`);
      }
    }
  };

  const handleInput = (value) => {
    const number = numbers.find((num) => num === value);
    const operand = operands.find((op) => op === value);

    switch (value) {
      case "=":
        handleCalc();
        break;
      case "AC":
        handleClear();
        break;
      case number:
        handleNums(value);
        break;
      case ".":
        handleDecimal();
        break;
      case operand:
        handleOperator(value);
        break;
      default:
        break;
    }
  };

  const handleOutput = () => {
    setResult(calcData);
  };

  useEffect(() => {
    handleOutput();
  }, [calcData]);

  return (
    <main className="main-container">
      <section className="calculator-container">
        <header className="calculator-output-container">
          <Display input={input} result={result} />
        </header>
        <footer className="calculator-grid">
          <Keyboard handleInput={handleInput} />
        </footer>
      </section>
    </main>
  );
}

export default App;
