import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState.jsx";

function UrheilijaLomake() {
  const { lisaaUrheilija } = useContext(GlobalContext);

  const [form, setForm] = useState({
    etunimi: "",
    sukunimi: "",
    kutsumanimi: "",
    syntymavuosi: "",
    paino: "",
    kuva_url: "",
    laji: "",
    saavutukset: "",
  });

  const [viesti, setViesti] = useState("");
  const [tallennetaan, setTallennetaan] = useState(false);

  const kasitteleMuutos = (e) => {
    const { name, value } = e.target;

    setForm((vanhaForm) => ({
      ...vanhaForm,
      [name]: value,
    }));
  };

  const kasitteleLahetys = async (e) => {
    e.preventDefault();
    setViesti("");
    setTallennetaan(true);

    try {
      await lisaaUrheilija({
        ...form,
        paino: form.paino === "" ? null : Number(form.paino),
        syntymavuosi: form.syntymavuosi || null,
      });

      setViesti("Urheilija lisättiin onnistuneesti!");

      setForm({
        etunimi: "",
        sukunimi: "",
        kutsumanimi: "",
        syntymavuosi: "",
        paino: "",
        kuva_url: "",
        laji: "",
        saavutukset: "",
      });
    } catch (error) {
      console.error("Urheilijan lisääminen epäonnistui:", error);
      setViesti("Lisääminen epäonnistui. Tarkista backend ja tiedot.");
    } finally {
      setTallennetaan(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Lisää urheilija</h2>

      <form onSubmit={kasitteleLahetys}>
        <div className="mb-3">
          <label htmlFor="etunimi" className="form-label">
            Etunimi *
          </label>
          <input
            id="etunimi"
            name="etunimi"
            className="form-control"
            value={form.etunimi}
            onChange={kasitteleMuutos}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="sukunimi" className="form-label">
            Sukunimi *
          </label>
          <input
            id="sukunimi"
            name="sukunimi"
            className="form-control"
            value={form.sukunimi}
            onChange={kasitteleMuutos}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="kutsumanimi" className="form-label">
            Kutsumanimi
          </label>
          <input
            id="kutsumanimi"
            name="kutsumanimi"
            className="form-control"
            value={form.kutsumanimi}
            onChange={kasitteleMuutos}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="syntymavuosi" className="form-label">
            Syntymäaika
          </label>
          <input
            type="date"
            id="syntymavuosi"
            name="syntymavuosi"
            className="form-control"
            value={form.syntymavuosi}
            onChange={kasitteleMuutos}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="paino" className="form-label">
            Paino (kg)
          </label>
          <input
            type="number"
            id="paino"
            name="paino"
            className="form-control"
            value={form.paino}
            onChange={kasitteleMuutos}
            min="0"
            step="0.01"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="kuva_url" className="form-label">
            Kuvan URL
          </label>
          <input
            type="url"
            id="kuva_url"
            name="kuva_url"
            className="form-control"
            value={form.kuva_url}
            onChange={kasitteleMuutos}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="laji" className="form-label">
            Laji *
          </label>
          <input
            id="laji"
            name="laji"
            className="form-control"
            value={form.laji}
            onChange={kasitteleMuutos}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="saavutukset" className="form-label">
            Saavutukset
          </label>
          <textarea
            id="saavutukset"
            name="saavutukset"
            className="form-control"
            value={form.saavutukset}
            onChange={kasitteleMuutos}
            rows="3"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={tallennetaan}
        >
          {tallennetaan ? "Tallennetaan..." : "Lisää urheilija"}
        </button>

        {viesti && <p className="mt-3">{viesti}</p>}
      </form>
    </div>
  );
}

export default UrheilijaLomake;
