const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  profesional_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Professional' },
  vacante_id: { type: mongoose.Schema.Types.ObjectId, ref: 'JobVacancy' },
  fecha_aplicacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);
