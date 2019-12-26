import React, { useState, useEffect } from "react";

const Filter = ({ setSortBy, sortBy }) => {
  const [value, setValue] = useState(sortBy);

  useEffect(() => {
    setSortBy(value);
  }, [value, setSortBy]);

  return (
    <div className="filter">
      <div
        className={sortBy.value === "name" ? "name active" : "name inactive"}
        name="name"
        onClick={() => setValue({ order: !value.order, value: "name" })}
      >
        Name
      </div>
      <div
        className={
          sortBy.value === "energy" ? "energy active" : "energy inactive"
        }
        name="energy"
        onClick={() => setValue({ order: !value.order, value: "energy" })}
      >
        Energy
      </div>
    </div>
  );
};

export default Filter;
