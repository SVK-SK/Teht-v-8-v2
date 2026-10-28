import { Link } from "react-router-dom";

function Ylatunniste() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Urheilijat
        </Link>

        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/">
            Etusivu
          </Link>

          <Link className="nav-link" to="/urheilija/lisaa">
            Lisää urheilija
          </Link>

          <Link className="nav-link" to="/tietoa">
            Tietoa sovelluksesta
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Ylatunniste;
