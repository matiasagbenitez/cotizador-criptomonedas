import styled from "@emotion/styled";

const Contenedor = styled.div`
  color: #fff;
  font-family: "Lato", sans-serif;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
`;
const Texto = styled.p`
  font-size: 1rem;
  span {
    font-weight: 700;
  }
`;
const Precio = styled.p`
  font-size: 2rem;
  margin: 0;
  span {
    font-weight: 700;
  }

    @media (min-width: 768px) {
        margin-top: 2rem;
`;

const Imagen = styled.img`
  display: block;
  width: 150px;
  max-width: 200px;
  margin: 1rem auto;

  @media (min-width: 768px) {
    margin: 0 auto;
  }
`;

export const Resultado = ({ resultado }) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } =
    resultado;

  return (
    <Contenedor>
      <Imagen
        src={`https://cryptocompare.com/${IMAGEURL}`}
        alt="Imagen criptomoneda"
      />
      <div>
        <Precio>
          Cotización: <span> {PRICE}</span>
        </Precio>
        <Texto>
          Precio más alto hoy: <span> {HIGHDAY}</span>
        </Texto>
        <Texto>
          Precio más bajo hoy: <span> {LOWDAY}</span>
        </Texto>
        <Texto>
          Variación últimas 24 horas: <span> {CHANGEPCT24HOUR}</span>
        </Texto>
        <Texto>
          Última actualización: <span> {LASTUPDATE}</span>
        </Texto>
      </div>
    </Contenedor>
  );
};
