// models/Station.js
import mongoose from 'mongoose';

const stationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  }
});

export default mongoose.model('Station', stationSchema);
