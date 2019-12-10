import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import "./App.css";

import minus from "./minus.svg";
import plus from "./plus.svg";

const App = () => {
  //const socket = openSocket("https://e6e4d7de.ngrok.io");
  const [peopleValue, setPeopleValue] = useState(0.5); // sätt inte? ett initialt värde för vad användarna tycker
  const [wasClicked, setWasClicked] = useState(false);

  useEffect(() => {
    //socket.emit("values to server", peopleValue);
  });

  const handleClick = action => {
    if (wasClicked) return;

    if (action === "add") {
      setPeopleValue(peopleValue + 0.01);
    } else if (action === "subtract") {
      setPeopleValue(peopleValue - 0.01);
    }

    setTimeout(() => {
      setWasClicked(false);
    }, 3000);

    return setWasClicked(true);
  };

  return (
    <div className="App">
      <div className={wasClicked ? "controls wasClicked" : "controls"}>
        <button
          className="controls__control controls__minus"
          onClick={() => handleClick("subtract")}
        >
          <img src={minus} />
        </button>
        <button
          className="controls__control controls__plus"
          onClick={() => handleClick("add")}
        >
          <img src={plus} />
        </button>
      </div>
      <div className="status">
        Energy:{" "}
        <span className="status__peopleValue">
          {Math.round(peopleValue * 100)}
        </span>{" "}
        / 100
      </div>
    </div>
  );
};

export default App;