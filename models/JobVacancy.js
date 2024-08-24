const mongoose = require('mongoose');

const jobVacancySchema = new mongoose.Schema({
  empresa_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer' },
  puesto: { type: String, required: true },
  descripcion: String,
  fecha_publicacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobVacancy', jobVacancySchema);
