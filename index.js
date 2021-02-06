const express = require('express');
const cors = require('cors');
const dbConnection = require('./database/config');

require('dotenv').config();

// Crear el servidor express
const app = express();

// DB connection
dbConnection();

// CORS
app.use(cors());

// Carpeta Public
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// Rutas.
app.use('/api/auth',require('./routes/auth'));
app.use('/api/events',require('./routes/events'));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})
