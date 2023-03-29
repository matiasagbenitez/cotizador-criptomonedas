import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useSelectMonedas } from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";
import { Error } from "./Error";

const InputSubmit = styled.input`
  background-color: #66a2fe;
  border: none;
  width: 100%;
  padding: 0.5rem;
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

export const Formulario = ({ setMonedas }) => {
  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);
  const [moneda, SelectMonedas] = useSelectMonedas(
    "Elige tu moneda local",
    monedas
  );
  const [criptomoneda, SelectCriptomoneda] = useSelectMonedas(
    "Elige tu criptomoneda",
    criptos
  );

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      const arrayCriptos = resultado.Data.map((cripto) => {
        return {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };
      });
      setCriptos(arrayCriptos);
    };
    consultarAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (moneda === "" || criptomoneda === "") {
      setError(true);
      return;
    }
    setError(false);
    setMonedas({
      moneda,
      criptomoneda,
    });
  };

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handleSubmit}>
        <SelectMonedas />
        <SelectCriptomoneda />
        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};
