const conexion = require('../database/db');
const MSG_ERROR_DB = require('../config/constants');

// Listar Cargos
exports.list = (req, res) => {
    conexion.query('SELECT * FROM cargo', (error, results) => {
        if (error) {
            console.error(error);
            return res.send(MSG_ERROR_DB);
        }
        res.render('cargo', { results });
    });
};

exports.listId = (req, res) => {
    const { id } = req.params;
    conexion.query('SELECT * FROM cargo WHERE IdCargo = ?', [id], (error, results) => {
        if (error) {
            console.error(error);
            return res.send(MSG_ERROR_DB);
        }
        res.render('cargoedit', { user: results[0] });
    });
};


// Mostrar formulario para registrar
exports.viewCreate = (req, res) => {
    res.render('cargonew');
};

// Guardar nuevo cargo
exports.create = (req, res) => {
    const { id, car, suel } = req.body;
    if (!id || !car || !suel) {
        return res.status(400).send({ error: 'Todos los campos son obligatorios' });
    }

    if (isNaN(suel)) {
        return res.status(400).send({ error: 'Sueldo debe ser un número' });
    }
    conexion.query('INSERT INTO cargo SET ?', {
        IdCargo: id,
        Cargo: car,
        Sueldo: suel
    }, (error) => {
        if (error) {
            console.error(error);
            return res.send(MSG_ERROR_DB);
        }
        res.redirect('/cargo');
    });
};

// Mostrar formulario editar
exports.viewEdit = (req, res) => {
    const { id } = req.params;
    conexion.query('SELECT * FROM cargo WHERE IdCargo = ?', [id], (error, results) => {
        if (error) {
            console.error(error);
            return res.send(MSG_ERROR_DB);
        }
        res.render('cargoedit', { user: results[0] });
    });
};

// Actualizar cargo
exports.update = (req, res) => {
    const { id, car, suel } = req.body;

    if (!id || !car || !suel) {
        return res.status(400).send({ error: 'Todos los campos son obligatorios' });
    }

    if (isNaN(suel)) {
        return res.status(400).send({ error: 'Sueldo debe ser un número' });
    }
    conexion.query('UPDATE cargo SET ? WHERE IdCargo = ?', [{ Cargo: car, Sueldo: suel }, id], (error) => {
        if (error) {
            console.error(error);
            return res.send(MSG_ERROR_DB);
        }
        res.redirect('/cargo');
    });
};

// Eliminar cargo
exports.delete = (req, res) => {
    const { id } = req.params;
    conexion.query('DELETE FROM cargo WHERE IdCargo = ?', [id], (error) => {
        if (error) {
            console.error(error);
            return res.send(MSG_ERROR_DB);
        }
        res.redirect('/cargo');
    });
};
