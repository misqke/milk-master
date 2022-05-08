import React from "react";
import styled from "styled-components";

const Page = ({ children }) => {
  return <Box>{children}</Box>;
};

export default Page;

const Box = styled.div`
  display: flex;
  position: relative;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-image: url("/cow.jpg");
  background-size: cover;
  background-position: center;
`;
