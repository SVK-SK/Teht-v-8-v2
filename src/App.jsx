import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Ylatunniste from "./components/Ylatunniste";
import Tietoa from "./pages/Tietoa";
import UrheilijaLomake from "./components/UrheilijaLomake";
import Urheilijat from "./components/Urheilijat";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Ylatunniste />

        <Routes>
          <Route path="/" element={<Urheilijat />} />
          <Route path="/urheilija/lisaa" element={<UrheilijaLomake />} />
          <Route path="/tietoa" element={<Tietoa />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
