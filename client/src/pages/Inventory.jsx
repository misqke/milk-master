import React, { useEffect, useState } from "react";
import { isAuth } from "../actions/auth";
import { submitInventory } from "../actions/submits";
import { useNavigate } from "react-router-dom";
import MilkRow from "../components/MilkRow";
import { getAllMilks } from "../actions/milks";

const Inventory = () => {
  // navigation
  const navigate = useNavigate();

  // states
  const [milks, setMilks] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submission = {
      milks: [],
      username,
      password,
    };
    milks.forEach((milk) => {
      const totalElement = document.querySelector(`#total${milk._id}`);
      submission.milks.push(totalElement.innerText);
    });
    const data = await submitInventory(submission);
    if (data.error) {
      console.log(data.error);
    } else {
      navigate("/confirmation");
    }
  };

  // use effects
  useEffect(() => {
    if (!isAuth()) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const getMilks = async () => {
      const data = await getAllMilks();
      setMilks(data.data);
    };
    getMilks();
  }, []);

  return (
    <div className="container py-5 px-3 bg-dark">
      {milks &&
        milks.map((milk) => {
          return <MilkRow milk={milk} key={milk._id} />;
        })}
      <form className="container my-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label text-primary" htmlFor="username">
            Deans Login
          </label>
          <input
            className="form-control"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="form-label text-primary" htmlFor="password">
            Deans Password
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-primary" type="submit">
            Submit Inventory
          </button>
        </div>
      </form>
    </div>
  );
};

export default Inventory;
