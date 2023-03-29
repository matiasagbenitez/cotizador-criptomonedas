import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ImagenCriptos from "./assets/imagen-criptos.png";
import { Formulario } from "./components/Formulario";
import { Resultado } from "./components/Resultado";
import { Spinner } from "./components/Spinner";
import { useFetch } from "./hooks/useFetch";

const Contenedor = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  width: 80%;

  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
    width: 90%;
  }
`;

const Imagen = styled.img`
  width: 400px;
  max-width: 100%;
  margin: 2rem auto;
  display: block;

  @media (min-width: 768px) {
    width: 600px;
    margin: 4rem auto;
  }
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  font-size: 2.1rem;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 1rem auto;
  }

  @media (min-width: 768px) {
    font-size: 2rem;
    margin: 4rem 0 2rem 0;
  }
`;

const MensajeError = styled.p`
  background-color: #b7322c;
  color: #fff;
  padding: 1rem;
  font-size: 1.2rem;
  text-align: center;
  font-weight: 700;
  margin-top: 2rem;
  font-family: "Lato", sans-serif;
`;

function App() {
  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(monedas).length === 0) return;
    const cotizarCripto = async () => {
      setCargando(true);
      setResultado({});
      const { moneda, criptomoneda } = monedas;
      try {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultado(resultado.DISPLAY[criptomoneda][moneda]);
        setCargando(false);
        setError(false);
      } catch {
        setError(true);
      }
    };
    cotizarCripto();
  }, [monedas]);

  return (
    <Contenedor>
      <Imagen src={ImagenCriptos} alt="Imagen Criptomonedas" />
      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>
        <Formulario setMonedas={setMonedas} />

        {error ? (
          <MensajeError>
            Ocurrió un error al intentar obtener los datos de la red.
          </MensajeError>
        ) : (
          <>
            {cargando && <Spinner />}
            {Object.keys(resultado).length !== 0 && (
              <Resultado resultado={resultado} />
            )}
          </>
        )}
      </div>
    </Contenedor>
  );
}

export default App;
