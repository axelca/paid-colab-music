import React, { useEffect } from "react";

const NowPlaying = ({ actions, nowPlaying }) => {
  useEffect(() => {
    setTimeout(() => {
      actions(null, "GET_CURRENT_TRACK");
    }, 1000);
  });

  return (
    <div className="bottomBar__nowPlaying">
      <img
        src={nowPlaying.item.album.images[2]}
        alt={nowPlaying.item.name}
        className="nowPlaying__image"
      />
      <span className="nowPlaying__artist">
        {nowPlaying.item.artists[0].name}
      </span>
      <span className="nowPlaying__song">{nowPlaying.item.name}</span>
    </div>
  );
};

export default NowPlaying;
