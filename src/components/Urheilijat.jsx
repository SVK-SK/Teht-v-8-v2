import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState.jsx";

function Urheilijat() {
  const { state, getUrheilijat, paivitaUrheilija, poistaUrheilija } =
    useContext(GlobalContext);

  const [muokattava, setMuokattava] = useState(null);
  const [viesti, setViesti] = useState("");
  const [ladataan, setLadataan] = useState(true);

  useEffect(() => {
    getUrheilijat()
      .catch((error) => {
        console.error("Urheilijoiden haku epäonnistui:", error);
        setViesti("Urheilijoiden lataaminen epäonnistui.");
      })
      .finally(() => setLadataan(false));
  }, []);

  const aloitaMuokkaus = (urheilija) => {
    setMuokattava({
      ...urheilija,
      syntymavuosi: urheilija.syntymavuosi
        ? String(urheilija.syntymavuosi).slice(0, 10)
        : "",
      paino: urheilija.paino ?? "",
    });
    setViesti("");
  };

  const kasitteleMuutos = (e) => {
    const { name, value } = e.target;
    setMuokattava((vanha) => ({ ...vanha, [name]: value }));
  };

  const tallennaMuutos = async (e) => {
    e.preventDefault();

    try {
      await paivitaUrheilija(muokattava.id, {
        ...muokattava,
        paino: muokattava.paino === "" ? null : Number(muokattava.paino),
        syntymavuosi: muokattava.syntymavuosi || null,
      });

      setMuokattava(null);
      setViesti("Urheilijan tiedot päivitettiin.");
    } catch (error) {
      console.error("Päivitys epäonnistui:", error);
      setViesti("Päivitys epäonnistui. Tarkista tiedot ja backend.");
    }
  };

  const poista = async (urheilija) => {
    const nimi = `${urheilija.etunimi} ${urheilija.sukunimi}`;

    if (!window.confirm(`Haluatko varmasti poistaa urheilijan ${nimi}?`)) {
      return;
    }

    try {
      await poistaUrheilija(urheilija.id);

      if (muokattava?.id === urheilija.id) {
        setMuokattava(null);
      }

      setViesti("Urheilija poistettiin.");
    } catch (error) {
      console.error("Poisto epäonnistui:", error);
      setViesti("Poistaminen epäonnistui.");
    }
  };

  return (
    <div className="container py-4">
      <div className="p-4 mb-4 rounded-3 bg-dark text-white">
        <h1>Urheilijat</h1>
        <p className="mb-0">
          Lisää, tarkastele, muokkaa ja poista urheilijoiden tietoja.
        </p>
      </div>

      <h2 className="mb-3">Urheilijalista</h2>

      {viesti && (
        <div className="alert alert-info" role="status">
          {viesti}
        </div>
      )}

      {ladataan ? (
        <p>Ladataan urheilijoita...</p>
      ) : state.urheilijat.length === 0 ? (
        <p>
          Urheilijoita ei vielä ole. Lisää ensimmäinen urheilija Lisää urheilija
          -valikosta.
        </p>
      ) : (
        <div className="row g-3">
          {state.urheilijat.map((urheilija) => (
            <div className="col-md-6 col-lg-4" key={urheilija.id}>
              <div className="card h-100 shadow-sm">
                {urheilija.kuva_url && (
                  <img
                    src={urheilija.kuva_url}
                    className="card-img-top"
                    alt={`${urheilija.etunimi} ${urheilija.sukunimi}`}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      objectPosition: "top",
                      backgroundColor: "#f1f3f5",
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}

                <div className="card-body">
                  <h3 className="h5">
                    {urheilija.etunimi} {urheilija.sukunimi}
                  </h3>

                  {urheilija.kutsumanimi && (
                    <p className="mb-1">
                      <strong>Kutsumanimi:</strong> {urheilija.kutsumanimi}
                    </p>
                  )}

                  <p className="mb-1">
                    <strong>Laji:</strong> {urheilija.laji}
                  </p>

                  {urheilija.syntymavuosi && (
                    <p className="mb-1">
                      <strong>Syntymäaika:</strong>{" "}
                      {String(urheilija.syntymavuosi).slice(0, 10)}
                    </p>
                  )}

                  {urheilija.paino != null && (
                    <p className="mb-1">
                      <strong>Paino:</strong> {urheilija.paino} kg
                    </p>
                  )}

                  {urheilija.saavutukset && (
                    <p className="mt-2">
                      <strong>Saavutukset:</strong> {urheilija.saavutukset}
                    </p>
                  )}
                </div>

                <div className="card-footer bg-white d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      muokattava?.id === urheilija.id
                        ? setMuokattava(null)
                        : aloitaMuokkaus(urheilija)
                    }
                  >
                    {muokattava?.id === urheilija.id
                      ? "Sulje muokkaus"
                      : "Muokkaa"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => poista(urheilija)}
                  >
                    Poista
                  </button>
                </div>

                {muokattava?.id === urheilija.id && (
                  <div className="card-body border-top bg-light">
                    <h3 className="h5 mb-3">Muokkaa urheilijaa</h3>

                    <form onSubmit={tallennaMuutos}>
                      {[
                        ["etunimi", "Etunimi"],
                        ["sukunimi", "Sukunimi"],
                        ["kutsumanimi", "Kutsumanimi"],
                        ["laji", "Laji"],
                        ["kuva_url", "Kuvan URL"],
                      ].map(([name, label]) => (
                        <div className="mb-3" key={name}>
                          <label
                            className="form-label"
                            htmlFor={`edit-${urheilija.id}-${name}`}
                          >
                            {label}
                          </label>

                          <input
                            id={`edit-${urheilija.id}-${name}`}
                            name={name}
                            className="form-control"
                            type={name === "kuva_url" ? "url" : "text"}
                            value={muokattava[name] ?? ""}
                            onChange={kasitteleMuutos}
                            required={["etunimi", "sukunimi", "laji"].includes(
                              name,
                            )}
                          />
                        </div>
                      ))}

                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor={`edit-${urheilija.id}-syntymavuosi`}
                        >
                          Syntymäaika
                        </label>

                        <input
                          id={`edit-${urheilija.id}-syntymavuosi`}
                          name="syntymavuosi"
                          type="date"
                          className="form-control"
                          value={muokattava.syntymavuosi ?? ""}
                          onChange={kasitteleMuutos}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor={`edit-${urheilija.id}-paino`}
                        >
                          Paino (kg)
                        </label>

                        <input
                          id={`edit-${urheilija.id}-paino`}
                          name="paino"
                          type="number"
                          min="0"
                          step="0.01"
                          className="form-control"
                          value={muokattava.paino}
                          onChange={kasitteleMuutos}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor={`edit-${urheilija.id}-saavutukset`}
                        >
                          Saavutukset
                        </label>

                        <textarea
                          id={`edit-${urheilija.id}-saavutukset`}
                          name="saavutukset"
                          className="form-control"
                          rows="3"
                          value={muokattava.saavutukset ?? ""}
                          onChange={kasitteleMuutos}
                        />
                      </div>

                      <button type="submit" className="btn btn-success me-2">
                        Tallenna muutokset
                      </button>

                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setMuokattava(null)}
                      >
                        Peruuta
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Urheilijat;
