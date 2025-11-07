const express = require('express');
const path = require('path');
const { MSG_ERROR_VALIDATION, MSG_ERROR_DB } = require('./config/constants');

const cargoRoutes = require('./routes/cargo.routes');
const empleadoRoutes = require('./routes/empleado.routes');

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ strict: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'css')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Asegura que busque en la carpeta correcta

// Validación básica de métodos
app.use((req, res, next) => {
    const allowedMethods = ['GET', 'POST'];
    if (!allowedMethods.includes(req.method)) {
        return res.status(405).send({ error: MSG_ERROR_VALIDATION });
    }
    next();
});

// Ruta raíz (opcional)
// Ruta raíz
app.get('/', (req, res) => {
    res.render('index', { msg: '✅ Servidor funcionando' });
});

// Rutas
app.use('/', cargoRoutes);
app.use('/', empleadoRoutes);


// Error global
app.use((err, req, res, next) => {
    console.error('Error inesperado:', err);
    res.status(500).send({ error: MSG_ERROR_DB });
});

// Servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Servidor en http://localhost:${PORT}`));
