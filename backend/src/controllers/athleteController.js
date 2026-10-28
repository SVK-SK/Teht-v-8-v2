import * as Athlete from "../models/athleteModel.js";

export async function getAll(req, res, next) {
  try {
    res.json(await Athlete.getAll());
  } catch (err) {
    next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const athlete = await Athlete.getById(req.params.id);
    if (!athlete) return res.status(404).json({ error: "Urheilijaa ei löydy" });
    res.json(athlete);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const d = req.body;
    if (!d.etunimi || !d.sukunimi || !d.laji) {
      return res
        .status(400)
        .json({ error: "Etunimi, sukunimi ja laji ovat pakollisia" });
    }
    const athlete = await Athlete.create(d);
    res.status(201).json(athlete);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const d = req.body;
    if (!d.etunimi || !d.sukunimi || !d.laji) {
      return res
        .status(400)
        .json({ error: "Etunimi, sukunimi ja laji ovat pakollisia" });
    }
    const athlete = await Athlete.update(req.params.id, d);
    if (!athlete) return res.status(404).json({ error: "Urheilijaa ei löydy" });
    res.json(athlete);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const deleted = await Athlete.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Urheilijaa ei löydy" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
