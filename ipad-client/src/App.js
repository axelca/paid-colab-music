import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";

import { isEmpty } from "./helpers/functions";

import "./App.css";
import minus from "./images/minus.svg";
import plus from "./images/plus.svg";
import play from "./images/next.svg";
import click from "./sounds/click2.mp3";

const socket = openSocket("http://localhost:8000");

const App = () => {
  // state
  const [peopleValue, setPeopleValue] = useState(0);
  const [nowPlaying, setNowPlaying] = useState({});
  const [available, setAvailable] = useState(false);
  const [count, setCount] = useState(0);

  // init
  socket.on("now playing", nowPlaying => {
    setNowPlaying(nowPlaying);
  });

  // when peopleValue updates, send data to server
  useEffect(() => {
    socket.emit("new value", peopleValue);
  }, [peopleValue]);

  useEffect(() => {
    if (count > 20) setAvailable(true);
  });

  // handle double clicks
  const handleDoubleClick = event => {
    if (event.target.className.includes("allowDoubleClick")) return;
    event.preventDefault();
  };

  // handle single clicks
  const handleClick = action => {
    setCount(count + 1);
    playSound();
    if (action === "add" && peopleValue < 1) {
      setPeopleValue(peopleValue + 0.01);
    } else if (action === "subtract" && peopleValue > 0.01) {
      setPeopleValue(peopleValue - 0.01);
    }
  };

  const handlePlay = () => {
    setCount(0);
    setAvailable(false);
    socket.emit("next", true);
  };

  // play sound when user clicks
  const playSound = () => {
    const audio = new Audio(click);
    if (!audio.paused) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  return (
    <div className="wrapper" onDoubleClick={handleDoubleClick}>
      <div className="App">
        <h1>Control the mood!</h1>
        <h3>
          Be a part of controlling the ambience by increasing or decreasing the
          energy level
        </h3>
        <div className="controls">
          <button
            className="controls__control controls__minus allowDoubleClick"
            onClick={() => handleClick("subtract")}
          >
            <img
              className="allowDoubleClick"
              src={minus}
              alt="decrease energy"
            />
          </button>
          <button
            className="controls__control controls__plus allowDoubleClick"
            onClick={() => handleClick("add")}
          >
            <img
              className="allowDoubleClick"
              src={plus}
              alt="increase energy"
            />
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
    </div>
  );
};

const NowPlaying = ({ data }) => {
  const { album, artists, name } = data;
  return (
    <div>
      <div>
        <img src={album.images[2].url} alt="album cover" />
      </div>
      <div>{name}</div>
      <div>{artists[0].name}</div>
    </div>
  );
};

export default App;
