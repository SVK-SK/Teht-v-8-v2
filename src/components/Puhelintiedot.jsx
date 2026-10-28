import React, { useContext, useEffect } from "react";
import yhteystiedotContext from "../context/YhteystiedotContext";
import Puhelintieto from "./Puhelintieto";

const Puhelintiedot = () => {
  const YhteystiedotContext = useContext(yhteystiedotContext); //hooks
  console.log(YhteystiedotContext);
  useEffect(() => {
    YhteystiedotContext.getYhteystiedot(); //ladataan yhteystiedot
    ///console.log(YhteystiedotContext);
  }, []); // useEffect suoritetaan vain kerran komponentin latautuessa, koska toinen argumentti on tyhjä taulukko
  return (
    <>
      <h1 className="display-4 mb-2">
        <span className="text-danger">Puhelintiedot</span>
      </h1>
      <React.Fragment>
        {YhteystiedotContext.yhteystiedot.length
          ? YhteystiedotContext.yhteystiedot.map((yhteystieto) => (
              <Puhelintieto key={yhteystieto.id} yhteystieto={yhteystieto} />
            ))
          : null}
      </React.Fragment>
    </>
  );
};

export default Puhelintiedot;
