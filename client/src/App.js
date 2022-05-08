import { useEffect, useState } from "react";
import Title from "./components/Title";
import LoadingMessage from "./components/LoadingMessage";
import MilkRow from "./components/MilkRow";
import Page from "./components/Page";
import axios from "axios";
import getColor from "./util/getColor";
import getTotal from "./util/getTotal";
import styled from "styled-components";
import "./styles/app.css";

// axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.baseURL = "https://milk-master.herokuapp.com";

export default function App() {
  const [milks, setMilks] = useState([]);
  const [loading, setLoading] = useState(
    milks.length ? "" : "Loading milk data..."
  );
  const [inventory, setInventory] = useState(true);
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const updateMilk = (index, newMilk) => {
    setMilks((prev) => [
      ...prev.slice(0, index),
      newMilk,
      ...prev.slice(index + 1),
    ]);
  };

  const getConfirmation = async () => {
    const { data } = await axios.get(
      `/api/submits/confirmation/?num=${inventory ? "1" : "2"}`
    );
    if (data.data) {
      setConfirmation(data.data);
      setLoading("");
    } else {
      setTimeout(() => {
        setLoading(data.message);
        getConfirmation();
      }, 10000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(`Submitting ${inventory ? "inventory" : "order"}...`);

    const submission = milks.map((milk) => {
      return getTotal(milk);
    });
    const { data } = await axios.post(
      `/api/submits/${inventory ? "inventory" : "order"}`,
      {
        milks: submission,
        login,
        password,
      },
      { timeout: 30000 }
    );
    if (data.message) {
      getConfirmation();
    }
  };

  // gather milk data at load
  useEffect(() => {
    const getMilkList = async () => {
      const { data } = await axios.get("/api/milks");

      const milkList = [];
      data.forEach((milk) => {
        const color = getColor(milk.name);
        const newMilk = {
          name: milk.name,
          crateMultiplier: Number(milk.crateMultiplier),
          singles: 0,
          crates: 0,
          stacks: 0,
          color,
        };
        milkList.push(newMilk);
      });
      setMilks(milkList);
      setLoading("");
    };

    if (!milks.length) {
      getMilkList();
    }
  }, [milks.length]);

  return (
    <Page>
      <Title />
      {loading.length > 0 ? (
        <LoadingMessage>{loading}</LoadingMessage>
      ) : confirmation.length > 0 ? (
        <Image src={`data:image/gif;base64, ${confirmation}`} alt="" />
      ) : (
        <Box>
          <TableHeader>
            <span>Name</span>
            <span>Stacks</span>
            <span>Crates</span>
            <span>Singles</span>
            <span>Total</span>
          </TableHeader>
          {milks.map((milk, i) => (
            <MilkRow
              key={milk.name}
              milk={milk}
              index={i}
              updateMilk={updateMilk}
            />
          ))}
          <Form onSubmit={handleSubmit}>
            <Selector>
              <button
                className={`btn ${inventory ? "active" : null}`}
                type="button"
                onClick={() => setInventory(true)}
              >
                Inventory
              </button>
              <button
                className={`btn ${!inventory ? "active" : null}`}
                type="button"
                onClick={() => setInventory(false)}
              >
                Order
              </button>
            </Selector>
            <label htmlFor="login">Dean&apos;s Login</label>
            <input
              type="text"
              id="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Deans Login"
            />
            <label htmlFor="password">Dean&apos;s Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Deans Password"
            />
            <SubmitBtn type="submit">submit</SubmitBtn>
          </Form>
        </Box>
      )}
    </Page>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  gap: 1rem;
  width: 90%;
  height: calc(100vh - 100px);
  margin-top: 70px;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: #3335;
  border-radius: 0.5rem;
  position: relative;
`;

const TableHeader = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 0 0.5rem;
  justify-content: space-around;
  height: 1.5rem;
  background-color: #0009;
  span {
    width: 50px;
    text-align: center;
    color: #fff;
  }
  span:first-child {
    display: flex;
    width: 30%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  label {
    color: #fff;
  }
  input {
    padding: 0.25rem;
    background-color: #1113;
    color: #fff;
  }
`;

const SubmitBtn = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #333;
  background-color: #33f3;
  color: #fff;
  cursor: pointer;
  transition-duration: 250ms;
  :hover {
    background-color: #33f8;
  }
`;

const Image = styled.img``;

const Selector = styled.div`
  display: flex;
`;
