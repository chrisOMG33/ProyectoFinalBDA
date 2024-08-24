const mongoose = require('mongoose');
const { Employer, Professional, JobVacancy, Curriculum } = require('./models/models'); // Asegúrate de que la ruta sea correcta

// Reemplaza estos valores con tus credenciales de MongoDB Atlas
const MONGO_URI = 'mongodb+srv://ProyectoCluster:root1212!@proyectocluster.szju6.mongodb.net/ProyectoFinal';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('MongoDB connection error:', err));

const loadData = async () => {
  try {
    // Limpiar colecciones existentes
    await Employer.deleteMany({});
    await Professional.deleteMany({});
    await JobVacancy.deleteMany({});
    await Curriculum.deleteMany({});

    // Crear empleadores
    const employers = [
      {
        cedula: 'J-1234-5678',
        nombre: 'Google LLC',
        tipo: 'Jurídica',
        direccion: '1600 Amphitheatre Parkway, Mountain View, CA 94043, USA',
        contacto: 'contact@google.com'
      },
      {
        cedula: 'J-2345-6789',
        nombre: 'Microsoft Corporation',
        tipo: 'Jurídica',
        direccion: 'One Microsoft Way, Redmond, WA 98052, USA',
        contacto: 'contact@microsoft.com'
      },
      {
        cedula: 'J-3456-7890',
        nombre: 'Apple Inc.',
        tipo: 'Jurídica',
        direccion: '1 Apple Park Way, Cupertino, CA 95014, USA',
        contacto: 'contact@apple.com'
      },
      {
        cedula: 'J-4567-8901',
        nombre: 'Amazon.com, Inc.',
        tipo: 'Jurídica',
        direccion: '410 Terry Avenue North, Seattle, WA 98109, USA',
        contacto: 'contact@amazon.com'
      },
      {
        cedula: 'J-5678-9012',
        nombre: 'Facebook, Inc.',
        tipo: 'Jurídica',
        direccion: '1 Hacker Way, Menlo Park, CA 94025, USA',
        contacto: 'contact@facebook.com'
      }
    ];

    const insertedEmployers = await Employer.insertMany(employers);

    // Crear profesionales
    const professionals = [
      {
        cedula: 'P-1234-5678',
        nombre: 'John Doe',
        genero: 'Masculino',
        profesiones: ['Desarrollador de Software', 'Ingeniero de Sistemas']
      },
      {
        cedula: 'P-2345-6789',
        nombre: 'Jane Smith',
        genero: 'Femenino',
        profesiones: ['Diseñadora Gráfica', 'Maestra de Diseño']
      },
      {
        cedula: 'P-3456-7890',
        nombre: 'Carlos Pérez',
        genero: 'Masculino',
        profesiones: ['Especialista en Marketing Digital', 'Analista de Datos']
      },
      {
        cedula: 'P-4567-8901',
        nombre: 'Laura García',
        genero: 'Femenino',
        profesiones: ['Ingeniera de Software', 'Arquitecta de Sistemas']
      },
      {
        cedula: 'P-5678-9012',
        nombre: 'Mario Rodríguez',
        genero: 'Masculino',
        profesiones: ['Administrador de Redes', 'Consultor IT']
      }
    ];

    const insertedProfessionals = await Professional.insertMany(professionals);

    // Crear currículums
    const curriculums = [
      {
        titulo: 'Currículum de John Doe',
        experiencia: 'Experiencia en desarrollo de software con tecnologías modernas.',
        educacion: 'Ingeniería en Sistemas de Información',
        habilidades: ['Node.js', 'MongoDB', 'JavaScript'],
        professional: insertedProfessionals.find(prof => prof.nombre === 'John Doe')._id
      },
      {
        titulo: 'Currículum de Jane Smith',
        experiencia: 'Experiencia en diseño gráfico y gestión de proyectos de diseño.',
        educacion: 'Licenciatura en Diseño Gráfico',
        habilidades: ['Adobe XD', 'Figma', 'Photoshop'],
        professional: insertedProfessionals.find(prof => prof.nombre === 'Jane Smith')._id
      }
      // Agrega más currículums según sea necesario
    ];

    const insertedCurriculums = await Curriculum.insertMany(curriculums);

    // Crear vacantes de trabajo
    const jobVacancies = [
      {
        titulo: 'Desarrollador Backend',
        descripcion: 'Desarrollador con experiencia en Node.js y bases de datos NoSQL.',
        area: 'Desarrollo Web'
      },
      {
        titulo: 'Diseñador UI/UX',
        descripcion: 'Diseñador con habilidades en Adobe XD y Figma.',
        area: 'Diseño'
      },
      {
        titulo: 'Analista de Marketing Digital',
        descripcion: 'Experto en estrategias de marketing digital y SEO.',
        area: 'Marketing'
      },
      {
        titulo: 'Ingeniero de Datos',
        descripcion: 'Experiencia en Big Data y análisis de datos.',
        area: 'Datos'
      },
      {
        titulo: 'Consultor en Tecnología',
        descripcion: 'Consultor con experiencia en soluciones tecnológicas empresariales.',
        area: 'Consultoría'
      }
    ];

    const insertedJobVacancies = await JobVacancy.insertMany(jobVacancies);

    // Asociar vacantes con empleadores
    const allEmployers = await Employer.find();
    const allJobVacancies = await JobVacancy.find();

    for (const employer of allEmployers) {
      const randomVacancies = allJobVacancies
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 1); // Hasta 3 vacantes por empleador
      employer.puestosOfertados.push(...randomVacancies);
      await employer.save();
    }

    console.log('Data loaded successfully.');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error loading data:', err);
    mongoose.connection.close();
  }
};

// Ejecutar script de carga de datos
loadData();
