import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Ylatunniste from "./components/Ylatunniste";
import GlobalState from "./context/GlobalState";
import Puhelintiedot from "./components/Puhelintiedot";
import MuokkaaPuhelintieto from "./components/MuokkaaPuhelintieto";
import Tietoa from "./pages/Tietoa";
import UrheilijaLomake from "./components/UrheilijaLomake";
import Urheilijat from "./components/Urheilijat.jsx";

function App() {
  return (
    <GlobalState>
      <BrowserRouter>
        <div className="App">
          <Ylatunniste turvataso="keskisuuri" />

          <div className="container">
            <Routes>
              {/* Etusivu näyttää urheilijan lisäyslomakkeen */}
              <Route path="/" element={<Urheilijat />} />

              <Route
                path="/puhelintieto/muokkaa/:id"
                element={<MuokkaaPuhelintieto />}
              />

              {/* Tietoa-sivu */}
              <Route path="/tietoa" element={<Tietoa />} />

              {/* Urheilijan lisäyslomake */}
              <Route path="/urheilija/lisaa" element={<UrheilijaLomake />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </GlobalState>
  );
}

export default App;
