import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ImagenCriptos from "./assets/imagen-criptos.png";
import { Formulario } from "./components/Formulario";
import { Resultado } from "./components/Resultado";
import { Spinner } from "./components/Spinner";

const Contenedor = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  width: 80%;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 350px;
  width: 90%;
  margin: 2rem auto;
  display: block;

  @media (min-width: 768px) {
    max-width: 400px;
    margin: 5rem auto;
  }
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  font-size: 2.2rem;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 1rem auto;
  }

  @media (min-width: 768px) {
    font-size: 2.5rem;
    margin: 8rem 0;
  }
`;

function App() {
  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (Object.keys(monedas).length === 0) return;
    const cotizarCripto = async () => {
      setCargando(true);
      setResultado({});
      const { moneda, criptomoneda } = monedas;
      console.log(moneda, criptomoneda);
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setResultado(resultado.DISPLAY[criptomoneda][moneda]);
      setCargando(false);
    };
    cotizarCripto();
  }, [monedas]);

  return (
    <Contenedor>
      <Imagen src={ImagenCriptos} alt="Imagen Criptomonedas" />
      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>
        <Formulario setMonedas={setMonedas} />
        {cargando && <Spinner />}
        {Object.keys(resultado).length !== 0 && (
          <Resultado resultado={resultado} />
        )}
      </div>
    </Contenedor>
  );
}

export default App;
