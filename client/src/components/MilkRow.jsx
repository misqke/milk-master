import React, { useState, useEffect } from "react";
import styled from "styled-components";
import getTotal from "../util/getTotal";

const MilkRow = ({ milk, index, updateMilk }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = getTotal(milk);
    setTotal(newTotal);
  }, [milk]);

  return (
    <Row style={{ color: `${milk.color}` }}>
      <Title>{milk.name}</Title>
      <Input
        type="text"
        min="0"
        inputMode="decimal"
        value={milk.stacks}
        onChange={(e) =>
          updateMilk(index, {
            name: milk.name,
            crateMultiplier: milk.crateMultiplier,
            stacks: Number(e.target.value),
            crates: milk.crates,
            singles: milk.singles,
          })
        }
      />
      <Input
        type="text"
        min="0"
        inputMode="decimal"
        value={milk.crates}
        onChange={(e) =>
          updateMilk(index, {
            name: milk.name,
            crateMultiplier: milk.crateMultiplier,
            stacks: milk.stacks,
            crates: Number(e.target.value),
            singles: milk.singles,
          })
        }
      />
      <Input
        type="text"
        min="0"
        inputMode="decimal"
        value={milk.singles}
        onChange={(e) =>
          updateMilk(index, {
            name: milk.name,
            crateMultiplier: milk.crateMultiplier,
            stacks: milk.stacks,
            crates: milk.crates,
            singles: Number(e.target.value),
          })
        }
      />
      <Total>{total}</Total>
    </Row>
  );
};

export default MilkRow;

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  text-shadow: 0 0 2px #222;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  width: 30%;
`;

const Input = styled.input`
  width: 50px;
  height: 50px;
  text-align: center;
  background: #1113;
  color: inherit;
`;

const Total = styled.p`
  text-align: center;
  width: 50px;
`;
