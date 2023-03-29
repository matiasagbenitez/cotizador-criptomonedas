import { useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  display: block;
  margin: 1rem 0;
  font-size: 1.2rem;
`;

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 0.5rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1rem;
`;

export const useSelectMonedas = (label, opciones) => {
  const [state, setState] = useState("");

  const SelectMonedas = () => (
    <>
      <Label htmlFor="moneda">{label}</Label>
      <Select
        id="moneda"
        value={state}
        onChange={(e) => setState(e.target.value)}
      >
        <option value="">Seleccione una moneda</option>
        {opciones.map((opcion) => (
          <option key={opcion.codigo} value={opcion.codigo}>
            {opcion.nombre}
          </option>
        ))}
      </Select>
    </>
  );
  return [state, SelectMonedas];
};
