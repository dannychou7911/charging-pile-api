// routes/station.js
import express from 'express';
import Station from '../models/Station.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Station:
 *       type: object
 *       required:
 *         - name
 *         - city
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         city:
 *           type: string
 *         isAvailable:
 *           type: boolean
 *         location:
 *           type: object
 *           properties:
 *             lat:
 *               type: number
 *             lng:
 *               type: number
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string

 * /api/stations:
 *   get:
 *     summary: 取得所有充電站資料
 *     tags: [Station]
 *     responses:
 *       200:
 *         description: 充電站列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Station'

 *   post:
 *     summary: 新增一筆充電站資料
 *     tags: [Station]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Station'
 *     responses:
 *       201:
 *         description: 建立成功
 *       400:
 *         description: 格式錯誤
 */

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


/**
 * @swagger
 * /api/stations/{id}:
 *   put:
 *     summary: 更新指定的充電站資料
 *     tags: [Station]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 充電站的 MongoDB ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Station'
 *     responses:
 *       200:
 *         description: 更新成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Station'
 *       404:
 *         description: 找不到資料
 */

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

/**
 * @swagger
 * /api/stations/{id}:
 *   delete:
 *     summary: 刪除指定的充電站資料
 *     tags: [Station]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 充電站的 MongoDB ID
 *     responses:
 *       204:
 *         description: 刪除成功（無回應內容）
 *       404:
 *         description: 找不到資料
 */
// 🔹 DELETE 刪除站點
router.delete('/:id', async (req, res) => {
  const deleted = await Station.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Not found' });
  res.status(204).send();
});

export default router;
