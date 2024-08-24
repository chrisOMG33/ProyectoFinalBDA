const { gql } = require('apollo-server');

const typeDefs = gql`
  type Employer {
    id: ID!
    cedula: String
    nombre: String
    tipo: String
    direccion: String
    contacto: String
    puestosOfertados: [JobVacancy]
  }

  type Professional {
    id: ID!
    cedula: String
    nombre: String
    genero: String
    profesiones: [String]
    curriculums: [Curriculum]
  }

  type JobVacancy {
    id: ID!
    titulo: String
    descripcion: String
    area: String
  }

  type Query {
    getAllEmployers: [Employer]
    getProfessionalByCedula(cedula: String!): Professional
    getProfessionalById(id: ID!): Professional
    getAllJobVacancies: [JobVacancy]
    getProfessionalsByArea(area: String!): [Professional]
    getProfessionalAreaReport: [AreaReport]
    getGenderReport: [GenderReport]
    getCurriculumById(id: ID!): Curriculum
  }

  type Mutation {
    addEmployer(cedula: String!, nombre: String!, tipo: String!, direccion: String!, contacto: String!): Employer
    updateEmployer(id: ID!, cedula: String, nombre: String, tipo: String, direccion: String, contacto: String): Employer
    deleteEmployer(id: ID!): Boolean

    addProfessional(cedula: String!, nombre: String!, genero: String!, profesiones: [String!]!): Professional
    updateProfessional(id: ID!, cedula: String, nombre: String, genero: String, profesiones: [String]): Professional
    deleteProfessional(id: ID!): Boolean

    addJobVacancy(titulo: String!, descripcion: String!, area: String!, employerId: ID!): JobVacancy
    updateJobVacancy(id: ID!, titulo: String, descripcion: String, area: String): JobVacancy
    deleteJobVacancy(id: ID!): Boolean

    addCurriculum(titulo: String!, experiencia: String!, educacion: String!, habilidades: [String]!, professionalId: ID!): Curriculum
  }

  type AreaReport {
    area: String
    cantidad: Int
    porcentaje: Float
  }

  type GenderReport {
    genero: String
    cantidad: Int
  }

  type Curriculum {
    id: ID!
    titulo: String!
    experiencia: String!
    educacion: String!
    habilidades: [String!]!
    professional: Professional!
  }
 
`;

module.exports = typeDefs;
