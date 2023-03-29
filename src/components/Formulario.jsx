import styled from "@emotion/styled";
import React from "react";
import { useSelectMonedas } from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";

const InputSubmit = styled.input`
  background-color: #66a2fe;
  border: none;
  width: 100%;
  padding: 0.7rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  margin-top: 1rem;

  &:hover {
    cursor: pointer;
    background-color: #326ac0;
  }
`;

export const Formulario = () => {
  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu moneda", monedas);

  return (
    <form>
      <SelectMonedas />
      <InputSubmit type="submit" value="Cotizar" />
    </form>
  );
};
