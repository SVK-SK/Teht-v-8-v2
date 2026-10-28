import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import yhteystiedotContext from "../context/YhteystiedotContext";
const MuokkaaPuhelintieto = () => {
  const [nimi, setNimi] = useState("");
  const [puhelin, setPuhelin] = useState("");
  //const [list, setList] = useState([]);
  const YhteystiedotContext = useContext(yhteystiedotContext); //hooks
  const { id } = useParams();

  let history = useNavigate();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      YhteystiedotContext.getYhteystieto(id).then((res) => {
        setNimi(res.nimi);
        setPuhelin(res.puhelin);
      });
    } else mounted = false;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paivitettyPuhelintieto = {
      nimi: nimi,
      puhelin: puhelin,
    };

    YhteystiedotContext.setYhteystieto(id, paivitettyPuhelintieto);
    history("/");
    window.location.reload();
  };
  const onChangeNimi = (e) => {
    setNimi(e.target.value);
  };
  const onChangePuhelin = (e) => {
    setPuhelin(e.target.value);
  };
  return (
    <div className="card mb-3">
      <div className="card-header">Muokkaa puhelintieto</div>

      <div className="card-body">
        <form onSubmit={handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="nimitieto">Nimi</label>
            <input
              type="text"
              name="nimi"
              id="nimitieto"
              className="form-control form-control-lg"
              placeholder="Syötä nimi..."
              value={nimi}
              onChange={onChangeNimi}
            />
          </div>
          <div className="form-group">
            <label htmlFor="puhelintieto">Puhelin</label>
            <input
              type="text"
              name="puhelin"
              id="puhelintieto"
              className="form-control form-control-lg"
              placeholder="Syötä puhelin..."
              value={puhelin}
              onChange={onChangePuhelin}
            />
          </div>
          <br />
          <input
            type="submit"
            value="Muokkaa puhelintieto"
            className="btn btn-light btn-block"
          />
        </form>
      </div>
    </div>
  );
};
export default MuokkaaPuhelintieto;
