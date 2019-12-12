import React from "react";

const Track = ({ data, available }) => {
  const { artists, name, energy } = data;
  return (
    <div className={available ? "track" : "track unavailable"}>
      <div className="track__info">
        {artists[0].name} - {name}
      </div>
      <div className="track__meta">Energy: {energy}</div>
    </div>
  );
};

export default Track;
