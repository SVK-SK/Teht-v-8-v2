import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import yhteystiedotContext from "../context/YhteystiedotContext";
import { useNavigate } from "react-router-dom";

const Puhelintieto = (props) => {
  const YhteystiedotContext = useContext(yhteystiedotContext);
  let history = useNavigate();
  const [naytaPuhelintieto, setnaytaPuhelintieto] = useState(false);

  const onShowClick = () => {
    let lippu = !naytaPuhelintieto;
    setnaytaPuhelintieto(lippu);
  };

  const onDeleteClick = (id) => {
    YhteystiedotContext.poistaYhteystieto(id);
    window.location.reload();
    history("/");
  };

  const { id, nimi, puhelin } = props.yhteystieto;
  return (
    <div className="card card-body mb-3 display:flex, justifyContent: flex-end">
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <h4>{nimi}</h4>
        <button className="button_left" onClick={onShowClick.bind(this)}>
          ...
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div
          className="btn-group mr-2 text-right"
          role="group"
          aria-label="Second group"
        >
          <button
            className="button_right"
            onClick={onDeleteClick.bind(this, { id })}
          >
            Poista
          </button>
          <Link to={`puhelintieto/muokkaa/${id}`}>
            <button className="button_right">Muokkaa</button>
          </Link>
        </div>
      </div>
      {naytaPuhelintieto ? (
        <ul className="list-group">
          <li className="list-group-item">Puhelin: {puhelin}</li>
        </ul>
      ) : null}
    </div>
  );
};

Puhelintieto.propTypes = {
  yhteystieto: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nimi: PropTypes.string.isRequired,
    puhelin: PropTypes.string.isRequired,
  }).isRequired,
};

export default Puhelintieto;
