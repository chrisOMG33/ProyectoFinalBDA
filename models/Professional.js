const mongoose = require('mongoose');

const professionalSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cedula: { type: String, required: true, unique: true },
  genero: String,
  areas: [{ type: String, required: true }],
  curriculo: { type: mongoose.Schema.Types.ObjectId, ref: 'Curriculum' }
});

module.exports = mongoose.model('Professional', professionalSchema);
