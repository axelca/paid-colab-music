import React from "react";

const ActionBar = ({ actions }) => {
  return (
    <div className="actionbar" onClick={() => actions(null, "PLAY")}>
      Play
    </div>
  );
};

export default ActionBar;
