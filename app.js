// app.js
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import stationRoutes from './routes/station.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/stations', stationRoutes);

await connectDB();

app.listen(PORT, () => {
  console.log(`🚀 API server is running at http://localhost:${PORT}`);
});
