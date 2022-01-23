import React, { useState, useEffect } from "react";
import { getColor } from "../utils/colors";

const MilkRow = ({ milk }) => {
  const [shelf, setShelf] = useState("");
  const [crates, setCrates] = useState("");
  const [total, setTotal] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    const updateTotal = () => {
      const shelfVal = Number(shelf);
      const cratesVal = Math.floor(Number(crates) * milk.multiplier);
      setTotal((shelfVal + cratesVal).toString());
    };
    updateTotal();
  }, [shelf, crates, milk.multiplier]);

  useEffect(() => {
    setColor(getColor(milk.color));
  }, [milk.color]);

  return (
    <div
      className="row mb-2 pt-2 pb-3 justify-content-evenly"
      style={{
        background: `linear-gradient(${color}, ${color} 18%, #333 35%, #222)`,
      }}
    >
      <div className="col-12">
        <h2
          className="my-auto pb-2"
          style={{ color: "#ddd", textShadow: "2px 2px 2px #000" }}
        >
          {milk.name}
        </h2>
      </div>
      <hr className="mb-2" />
      <div className="col-4 d-flex flex-column justify-content-center align-items-center">
        <div className="col-10 text-center text-white">Shelf</div>
        <input
          className="col-10 text-center fs-3 rounded text-white"
          type="text"
          min="0"
          inputMode="decimal"
          value={shelf}
          onChange={(e) => setShelf(e.target.value)}
          style={{ height: "50px", backgroundColor: "#444" }}
        />
      </div>
      <div className="col-4 d-flex flex-column justify-content-center align-items-center">
        <div className="col-10 text-center text-white">Crates</div>
        <input
          className="col-10 text-center fs-3 rounded text-white"
          type="text"
          min="0"
          inputMode="decimal"
          value={crates}
          onChange={(e) => setCrates(e.target.value)}
          style={{ height: "50px", backgroundColor: "#444" }}
        />
      </div>
      <div className="col-2 d-flex flex-column justify-content-center align-items-center">
        <div
          className={`col-12 text-center h1`}
          id={`total${milk._id}`}
          style={{ color: `${color}` }}
        >
          {total}
        </div>
      </div>
    </div>
  );
};

export default MilkRow;
