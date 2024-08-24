const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers/resolvers');

// Conexión a MongoDB
mongoose.connect('mongodb+srv://ProyectoCluster:root1212!@proyectocluster.szju6.mongodb.net/ProyectoFinal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Crear el servidor Apollo
const server = new ApolloServer({ typeDefs, resolvers });

// Iniciar el servidor
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
