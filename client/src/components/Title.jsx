import React from "react";
import styled from "styled-components";

const Title = () => {
  return <Text>Milk Master v2.0</Text>;
};

export default Title;

const Text = styled.h1`
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
  width: 100%;
  background-color: #0004;
  backdrop-filter: blur(5px);
  border-radius: 0.5rem;
  padding: 0.5rem;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  color: #00f;
  margin: 0;
`;
