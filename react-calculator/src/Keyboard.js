import React from "react";
import Key from "./Key";
import { data } from "./App";

function Keyboard({ handleInput }) {
  return (
    <>
      {data.map((key) => {
        return <Key key={key.id} keyData={key} handleInput={handleInput} />;
      })}
    </>
  );
}

export default Keyboard;
