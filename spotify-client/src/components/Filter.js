import React, { useState, useEffect } from "react";

const Filter = ({ filterChange, sortBy }) => {
  const [value, setValue] = useState(sortBy);

  useEffect(() => {
    filterChange(value);
  }, [value]);

  return (
    <div className="filter">
      <div
        className={sortBy.value === "name" ? "name active" : "name inactive"}
        name="name"
        onClick={() => setValue({ acs: !value.acs, value: "name" })}
      >
        Name
      </div>
      <div
        className={
          sortBy.value === "energy" ? "energy active" : "energy inactive"
        }
        name="energy"
        onClick={() => setValue({ acs: !value.acs, value: "energy" })}
      >
        Energy
      </div>
    </div>
  );
};

export default Filter;
