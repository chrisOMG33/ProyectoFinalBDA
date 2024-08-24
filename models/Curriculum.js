const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  empresa: String,
  puesto: String,
  fecha: Date
});

const curriculumSchema = new mongoose.Schema({
  profesional_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Professional' },
  titulos: [String],
  experiencia: [experienceSchema]
});

module.exports = mongoose.model('Curriculum', curriculumSchema);
