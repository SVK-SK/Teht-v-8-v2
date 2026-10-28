import pool from "../config/database.js";

const fields = `
  etunimi, sukunimi, kutsumanimi, syntymavuosi,
  paino, kuva_url, laji, saavutukset
`;

export async function getAll() {
  return pool.query("SELECT * FROM urheilijat ORDER BY sukunimi, etunimi");
}

export async function getById(id) {
  const rows = await pool.query("SELECT * FROM urheilijat WHERE id = ?", [id]);
  return rows[0] ?? null;
}

export async function create(data) {
  const result = await pool.query(
    `INSERT INTO urheilijat (${fields})
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.etunimi,
      data.sukunimi,
      data.kutsumanimi || null,
      data.syntymavuosi || null,
      data.paino ?? null,
      data.kuva_url || null,
      data.laji,
      data.saavutukset || null,
    ],
  );
  return getById(result.insertId);
}

export async function update(id, data) {
  const result = await pool.query(
    `UPDATE urheilijat SET
     etunimi=?, sukunimi=?, kutsumanimi=?, syntymavuosi=?,
     paino=?, kuva_url=?, laji=?, saavutukset=?
     WHERE id=?`,
    [
      data.etunimi,
      data.sukunimi,
      data.kutsumanimi || null,
      data.syntymavuosi || null,
      data.paino ?? null,
      data.kuva_url || null,
      data.laji,
      data.saavutukset || null,
      id,
    ],
  );

  return result.affectedRows ? getById(id) : null;
}

export async function remove(id) {
  const result = await pool.query("DELETE FROM urheilijat WHERE id = ?", [id]);
  return result.affectedRows > 0;
}
