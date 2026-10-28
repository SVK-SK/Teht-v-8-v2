//import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import yhteystiedotContext from "../context/YhteystiedotContext";

export default function LisaaPuhelintieto() {
  let history = useNavigate();
  const [nimi, setNimi] = useState("");
  const [puhelin, setPuhelin] = useState("");
  //const [virheet, setVirheet] = useState({});
  const YhteystiedotContext = useContext(yhteystiedotContext); //hooks

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uusiPuhelintieto = {
      nimi: nimi,
      puhelin: puhelin,
    };
    console.log("Tarkistetaan uusiPuhelintieto -objekti:");
    console.log(uusiPuhelintieto);

    YhteystiedotContext.setYhteystiedot(uusiPuhelintieto);
    history("/");
  };
  return (
    <div className="card mb-3">
      <div className="card-header">Lisää puhelintieto</div>
      <div className="card-body">
        <form onSubmit={handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="nimitieto">Nimi</label>
            <input
              id="nimitieto"
              type="text"
              name="nimi"
              className="form-control form-control-lg"
              placeholder="Syötä nimi..."
              value={nimi}
              onChange={(event) => setNimi(event.target.value)}
              //error={virheet.nimi}
            />
            <div className="invalid-feedback">Täytä nimi</div>
          </div>
          <div className="form-group">
            <label htmlFor="puhelintieto">Puhelin</label>
            <input
              id="puhelintieto"
              type="text"
              name="puhelin"
              className="form-control form-control-lg"
              placeholder="Syötä puhelin..."
              value={puhelin}
              onChange={(event) => setPuhelin(event.target.value)}
              //error={virheet.puhelin}
            />
            <div className="invalid-feedback">Täytä puhelin</div>
          </div>
          <br />
          <input
            type="submit"
            value="Lisää puhelintieto"
            className="btn btn-light btn-block"
          />
        </form>
      </div>
    </div>
  );
}
