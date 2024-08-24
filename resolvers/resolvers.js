const { Employer, Professional, JobVacancy, Curriculum } = require('../models/models');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const resolvers = {
  Query: {
    // 1. Impresión general del empleador
    getAllEmployers: async () => {
      return await Employer.find({}, 'cedula nombre puestosOfertados')
        .populate('puestosOfertados', 'titulo descripcion area');
    },

    // 2. Imprimir información específica de un profesional
    getProfessionalById: async (_, { id }) => {
      return await Professional.findById(id)
        .populate('curriculums'); // Asegúrate de que el campo `curriculums` está poblado
    },
  
    // 3. Impresión de inventario de plazas vacantes
    getAllJobVacancies: async () => {
      return await JobVacancy.find();
    },
    getProfessionalByCedula: async (_, { cedula }) => {
      // Implementa la lógica para obtener un profesional por cédula
      return await Professional.findOne({ cedula });
    },

    // 4. Nombre de todos los profesionales postulantes para una determinada área
    getProfessionalsByArea: async (_, { area }) => {
      const professionals = await Professional.find({ profesiones: area });
      return professionals.map(prof => prof.nombre);
    },

    getProfessionalsByArea: async (_, { area }) => {
      return await Professional.find({ profesiones: area });
    },

    getCurriculumById: async (_, { id }) => {
      return await Curriculum.findById(id).populate('professional');
    },
    
    // 5. Cantidad y porcentaje de profesionales registradas por área
    getProfessionalAreaReport: async () => {
      const professionals = await Professional.find();
      const total = professionals.length;
      const areas = {};

      professionals.forEach(prof => {
        prof.profesiones.forEach(area => {
          areas[area] = (areas[area] || 0) + 1;
        });
      });

      return Object.keys(areas).map(area => ({
        area,
        cantidad: areas[area],
        porcentaje: (areas[area] / total) * 100
      }));
    },

    // 6. Cantidad de profesionales registrados por género
    getGenderReport: async () => {
      const professionals = await Professional.find();
      const genderCount = {};

      professionals.forEach(prof => {
        genderCount[prof.genero] = (genderCount[prof.genero] || 0) + 1;
      });

      return Object.keys(genderCount).map(genero => ({
        genero,
        cantidad: genderCount[genero]
      }));
    }
  },
  Mutation: {
    // Mutations para empleadores
    addEmployer: async (_, { cedula, nombre, tipo, direccion, contacto }) => {
      const newEmployer = new Employer({ cedula, nombre, tipo, direccion, contacto });
      return await newEmployer.save();
    },
    updateEmployer: async (_, { id, cedula, nombre, tipo, direccion, contacto }) => {
      return await Employer.findByIdAndUpdate(
        id,
        { cedula, nombre, tipo, direccion, contacto },
        { new: true }
      );
    },
    deleteEmployer: async (_, { id }) => {
      const result = await Employer.findByIdAndDelete(id);
      return !!result;
    },

    // Mutations para profesionales
    addProfessional: async (_, { cedula, nombre, genero, profesiones }) => {
      const newProfessional = new Professional({ cedula, nombre, genero, profesiones });
      return await newProfessional.save();
    },
    updateProfessional: async (_, { id, cedula, nombre, genero, profesiones }) => {
      const updateFields = {};
      if (cedula !== undefined) updateFields.cedula = cedula;
      if (nombre !== undefined) updateFields.nombre = nombre;
      if (genero !== undefined) updateFields.genero = genero;
      if (profesiones !== undefined) updateFields.profesiones = profesiones;

      return await Professional.findByIdAndUpdate(id, updateFields, { new: true });
    },
    deleteProfessional: async (_, { id }) => {
      const result = await Professional.findByIdAndDelete(id);
      return !!result;
    },
        // Mutations para currículum
    addCurriculum: async (_, { titulo, experiencia, educacion, habilidades, professionalId }) => {
      const professional = await Professional.findById(professionalId);
      if (!professional) throw new Error('Professional not found');

      const newCurriculum = new Curriculum({
        titulo,
        experiencia,
        educacion,
        habilidades,
        professional: professionalId,
      });

      const savedCurriculum = await newCurriculum.save();

      // Actualiza el campo 'curriculums' del profesional
      professional.curriculums.push(savedCurriculum._id);
      await professional.save();

      return savedCurriculum;
    },

        // Mutations para vacantes de trabajo
    addJobVacancy: async (_, { titulo, descripcion, area, employerId }) => {
      const employer = await Employer.findById(employerId);
      if (!employer) throw new Error('Employer not found');

      // Verificar si el empleador ya tiene 3 vacantes
      if (employer.puestosOfertados.length >= 3) {
        throw new Error('Este empleador ya ha publicado el máximo de 3 vacantes.');
      }

      const newJobVacancy = new JobVacancy({ titulo, descripcion, area });
      const savedJobVacancy = await newJobVacancy.save();

      employer.puestosOfertados.push(savedJobVacancy);
      await employer.save();

      return savedJobVacancy;
    },

    updateJobVacancy: async (_, { id, titulo, descripcion, area }) => {
      return await JobVacancy.findByIdAndUpdate(
        id,
        { titulo, descripcion, area },
        { new: true }
      );
    },
    deleteJobVacancy: async (_, { id }) => {
      const result = await JobVacancy.findByIdAndDelete(id);
      return !!result;
    }
  }
};

module.exports = resolvers;
