import React from "react";
import styled, { keyframes } from "styled-components";

const LoadingMessage = ({ children }) => {
  return <Message>{children}</Message>;
};

export default LoadingMessage;

const loadAnimation = keyframes`
  0% {background: linear-gradient(90deg, #33f3 0%, #3333 1%)}
  12.5% {background: linear-gradient(90deg, #33f3 12.5%, #3333 15%)}
25% {background: linear-gradient(90deg, #33f3 25%, #3333 27%)}
  37.5% {background: linear-gradient(90deg, #33f3 37.5%, #3333 40%)}
  50% {background: linear-gradient(90deg, #33f3 50%, #3333 52%)}
  62.5% {background: linear-gradient(90deg, #33f3 62.5%, #3333 65%)}
  75% {background: linear-gradient(90deg, #33f3 75%, #3333 78%)}
  87.5% {background: linear-gradient(90deg, #33f3 87.5%, #3333 90%)}
  100% {background: linear-gradient(90deg, #33f3 99%, #3333 100%)}
  
`;

const Message = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  background: #3333;
  backdrop-filter: blur(4px);
  padding: 1rem;
  border-radius: 0.5rem;
  color: #fff;
  animation-name: ${loadAnimation};
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
`;
