import React from "react";

const Playlist = ({ actions, data }) => {
  const { id, name } = data;
  return <div onClick={() => actions(id, "SET_ACTIVE_PLAYLIST")}>{name}</div>;
};

export default Playlist;
