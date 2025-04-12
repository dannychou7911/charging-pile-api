// routes/station.js
import express from 'express';
import Station from '../models/Station.js';

const router = express.Router();

// 🔹 GET 所有站點
router.get('/', async (req, res) => {
  const stations = await Station.find();
  res.json(stations);
});

// 🔹 GET 單一站點
router.get('/:id', async (req, res) => {
  const station = await Station.findById(req.params.id);
  if (!station) return res.status(404).json({ error: 'Not found' });
  res.json(station);
});

// 🔹 POST 新增站點
router.post('/', async (req, res) => {
  try {
    const station = new Station(req.body);
    await station.save();
    res.status(201).json(station);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 PUT 更新站點
router.put('/:id', async (req, res) => {
  try {
    const updated = await Station.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 DELETE 刪除站點
router.delete('/:id', async (req, res) => {
  const deleted = await Station.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Not found' });
  res.status(204).send();
});

export default router;
