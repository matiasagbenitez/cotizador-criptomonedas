import styled from "@emotion/styled";
import React from "react";

const Texto = styled.div`
  background-color: #b7322c;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  font-family: "Lato", sans-serif;
  font-size: 1.2rem;
  border-radius: 10px;
`;

export const Error = ({ children }) => {
  return <Texto>{children}</Texto>;
};
