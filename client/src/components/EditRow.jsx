import React, { useState } from "react";
import { getColor } from "../utils/colors";
import { updateMilk } from "../actions/milks";

const EditRow = ({ milk }) => {
  const [color, setColor] = useState(getColor(milk.color));
  const colorList = [
    "blue",
    "lt blue",
    "red",
    "yellow",
    "green",
    "lt green",
    "brown",
    "lt brown",
    "orange",
    "purple",
  ];
  const [multiplier, setMultiplier] = useState(milk.multiplier);

  const handleMultiplierChange = async (e) => {
    setMultiplier(e.target.value);
    const newMilk = {
      _id: milk._id,
      multiplier: multiplier,
    };
    await updateMilk(newMilk);
  };

  const handleColorChange = async (e) => {
    setColor(e.target.value);
    const newMilk = {
      _id: milk._id,
      color: e.target.value,
    };
    await updateMilk(newMilk);
  };

  return (
    <div
      className="row mb-2 pt-2 pb-3 justify-content-evenly"
      style={{
        background: `linear-gradient(${color}, ${color} 18%, #333 35%, #222)`,
      }}
    >
      <div className="col-12">
        <h4
          className="my-auto pb-2"
          style={{ color: "#ddd", textShadow: "2px 2px 2px #000" }}
        >
          {milk.name}
        </h4>
      </div>
      <hr />
      <div className="col-5 d-flex flex-column justify-content-center align-items-center">
        <div className="col-10 text-center text-white">per crate</div>
        <input
          className="col-10 text-center fs-5 rounded text-white bg-dark"
          type="text"
          min="0"
          inputMode="decimal"
          value={multiplier}
          onChange={handleMultiplierChange}
          style={{ height: "35px" }}
        />
      </div>
      <div className="col-5 d-flex flex-column justify-content-center align-items-center">
        <div className="col-10 text-center text-white">Color</div>
        <select
          class="form-select text-center col-10 bg-dark"
          onChange={handleColorChange}
          style={{ height: "35px", color: `${color}` }}
        >
          {colorList.map((colora) => (
            <option
              selected={getColor(colora) === color ? true : false}
              key={colora}
              value={colora}
              style={{ color: `${getColor(colora)}` }}
            >
              {colora}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default EditRow;
