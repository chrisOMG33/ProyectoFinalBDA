const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, enum: ['física', 'jurídica'], required: true },
  direccion: String,
  contacto: String
});

module.exports = mongoose.model('Employer', employerSchema);
