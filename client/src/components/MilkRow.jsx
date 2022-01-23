import React, { useState, useEffect } from "react";

const MilkRow = ({ milk }) => {
  const [shelf, setShelf] = useState("");
  const [crates, setCrates] = useState("");
  const [total, setTotal] = useState("");

  useEffect(() => {
    const updateTotal = () => {
      const shelfVal = Number(shelf);
      const cratesVal = Math.floor(Number(crates) * milk.multiplier);
      setTotal((shelfVal + cratesVal).toString());
    };
    updateTotal();
  }, [shelf, crates, milk.multiplier]);

  return (
    <div
      className="row my-2 pt-2 pb-3 justify-content-evenly"
      style={{ background: `${milk.color}` }}
    >
      <div className="col-12">
        <h2 className="my-auto pb-1">{milk.name}</h2>
      </div>
      <hr className="mb-2" />
      <div className="col-4 d-flex flex-column justify-content-center align-items-center">
        <div className="col-10 text-center">Shelf</div>
        <input
          className="col-10 text-center fs-3"
          type="text"
          min="0"
          inputMode="decimal"
          value={shelf}
          onChange={(e) => setShelf(e.target.value)}
          style={{ height: "50px", width: "80%" }}
        />
      </div>
      <div className="col-4 d-flex flex-column justify-content-center align-items-center">
        <div className="col-10 text-center">Crates</div>
        <input
          className="col-10 text-center fs-3"
          type="text"
          min="0"
          inputMode="decimal"
          value={crates}
          onChange={(e) => setCrates(e.target.value)}
          style={{ height: "50px" }}
        />
      </div>
      <div className="col-2 d-flex flex-column justify-content-center align-items-center">
        <div className="col-12 text-center h1" id={`total${milk._id}`}>
          {total}
        </div>
      </div>
    </div>
  );
};

export default MilkRow;
