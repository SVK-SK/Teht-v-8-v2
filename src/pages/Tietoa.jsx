function Tietoa() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <h1 className="mb-3">Tietoa urheilijasovelluksesta</h1>

              <p className="lead">
                Urheilijasovelluksen avulla voit hallita urheilijoiden tietoja
                helposti yhdessä paikassa.
              </p>

              <hr />

              <h2 className="h5">Sovelluksen ominaisuudet</h2>

              <ul>
                <li>Urheilijoiden lisääminen</li>
                <li>Urheilijoiden tietojen tarkastelu</li>
                <li>Urheilijoiden tietojen muokkaaminen</li>
                <li>Urheilijoiden poistaminen</li>
                <li>Urheilijoiden lajien ja saavutusten tallentaminen</li>
              </ul>

              <p className="text-secondary mb-0">Versio 1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tietoa;
