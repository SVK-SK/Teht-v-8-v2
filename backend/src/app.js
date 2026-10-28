import express from "express";
import cors from "cors";
import "dotenv/config";
import pool from "./config/database.js";
import athleteRoutes from "./routes/athleteRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Urheilijoiden REST API toimii" });
});

app.use("/api/urheilijat", athleteRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Palvelimen virhe" });
});

const port = process.env.PORT || 3001;

app.listen(port, async () => {
  try {
    await pool.query("SELECT 1");
    console.log(`Palvelin käynnissä: http://localhost:${port}`);
    console.log("MariaDB-yhteys toimii");
  } catch (err) {
    console.error("Tietokantayhteys epäonnistui:", err.message);
  }
});
