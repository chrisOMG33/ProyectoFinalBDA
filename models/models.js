const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema para Employer
const employerSchema = new mongoose.Schema({
  cedula: String,
  nombre: String,
  tipo: String, // Físico o Jurídico
  direccion: String,
  contacto: String,
  puestosOfertados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobVacancy' }]
});

const Employer = mongoose.model('Employer', employerSchema);

// Esquema para Professional
const professionalSchema = new mongoose.Schema({
  cedula: String,
  nombre: String,
  genero: String, // Masculino, Femenino, Otro
  profesiones: [String], // Lista de profesiones
  curriculums: [{ type: Schema.Types.ObjectId, ref: 'Curriculum' }],
});

const Professional = mongoose.model('Professional', professionalSchema);

// Esquema para JobVacancy
const jobVacancySchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  area: String // Área de la vacante
});

const JobVacancy = mongoose.model('JobVacancy', jobVacancySchema);

// Esquema para Curriculum
const CurriculumSchema = new Schema({
  titulo: String,
  experiencia: String,
  educacion: String,
  habilidades: [String],
  professional: { type: Schema.Types.ObjectId, ref: 'Professional' },
});

const Curriculum = mongoose.model('Curriculum', CurriculumSchema);

module.exports = { Employer, Professional, JobVacancy, Curriculum };
