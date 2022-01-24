import React, { useEffect, useState } from "react";
import { isAuth } from "../actions/auth";
import { submitInventory, getConfirmation } from "../actions/submits";
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
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");

  // functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(
      "Submitting inventory... This may take a few moments... Do not refresh or close browser...."
    );
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
      setMessage("");
    } else {
      setMessage(data.msg);
      const getImage = setInterval(async () => {
        const data = await getConfirmation();
        if (data.data) {
          setUrl(data.data);
          setMessage(data.msg);
          clearInterval(getImage);
        } else {
          setMessage(data.msg);
        }
      }, 20000);
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

  if (message) {
    return (
      <div className="container d-flex justify-content-center flex-column py-3 align-items-center">
        <h3 className="text-primary text-center py-3">{message}</h3>
        {url && <img src={`data:image/png;base64,${url}`} alt="confirmation" />}
      </div>
    );
  }

  if (!message) {
    return (
      <div className="container py-2 px-3 bg-dark">
        {milks &&
          milks.map((milk) => {
            return <MilkRow milk={milk} key={milk._id} />;
          })}
        <form className="container my-5" onSubmit={handleSubmit}>
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
  }
};

export default Inventory;
