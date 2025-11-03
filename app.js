const express = require('express');
const path = require('path');
const { MSG_ERROR_DB } = require('./config/constants');

const cargoRoutes = require('./routes/cargo.routes');
const empleadoRoutes = require('./routes/empleado.routes');

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ strict: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'css')));
app.set('view engine', 'ejs');

// Validación básica de métodos
app.use((req, res, next) => {
    const allowedMethods = ['GET', 'POST'];
    if (!allowedMethods.includes(req.method)) {
        return res.status(405).send({ error: MSG_ERROR_VALIDATION });
    }
    next();
});

// Rutas
app.use('/', cargoRoutes);
app.use('/', empleadoRoutes);

// 404
app.use((req, res) => {
    res.status(404).render('404', { url: req.originalUrl, msg: MSG_ERROR_NOT_FOUND });
});

// Error global
app.use((err, req, res, next) => {
    console.error('Error inesperado:', err);
    res.status(500).send({ error: MSG_ERROR_DB });
});

// Servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Servidor en http://localhost:${PORT}`));
