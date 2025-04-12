// app.js
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import stationRoutes from './routes/station.js';
import { swaggerUi, swaggerSpec } from './swagger.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 🔹 掛上 Swagger 文件頁面
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 🔹 API 路由
app.use('/api/stations', stationRoutes);

await connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📚 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
