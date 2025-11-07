const conexion = require('../database/db');
const MSG_ERROR_DB = require('../config/constants');

exports.listarEmpleados = (req, res) => {
    conexion.query('SELECT * FROM empleado', (error, results) => {
        if (error) {
            console.error(error);
            return res.send(MSG_ERROR_DB);
        }
        res.render('empleado', { results });
    });
};

exports.viewCreate = (req, res) => res.render('empleadonew');

exports.create = (req, res) => {
    const { idemp, ape, nom, dir, tel, idcar } = req.body;
    // Validaciones básicas
    if (!idemp || !ape || !nom || !dir || !tel || !idcar) {
        return res.status(400).send({ error: "Todos los campos son obligatorios" });
    }

    // Validación mínima de texto
    if (ape.trim().length < 2 || nom.trim().length < 2) {
        return res.status(400).send({ error: "Nombre y apellido deben tener al menos 2 caracteres" });
    }

    // ✅ Validación estricta de teléfono peruano (9 dígitos)
    if (!/^\d{9}$/.test(tel)) {
        return res.status(400).send({ error: "El teléfono debe contener exactamente 9 dígitos" });
    }

    conexion.query('INSERT INTO empleado SET ?',
        { IdEmpleado: idemp, Apellidos: ape, Nombres: nom, Direccion: dir, Telefono: tel, IdCargo: idcar },
        (error) => {
            if (error) {
                console.error(error);
                return res.send(MSG_ERROR_DB);
            }
            res.redirect('/empleado');
        }
    );
};

exports.viewEdit = (req, res) => {
    const { idemp } = req.params;
    conexion.query('SELECT * FROM empleado WHERE IdEmpleado = ?', [idemp], (error, results) => {
        if (error) {
            console.error(error);
            return res.send(MSG_ERROR_DB);
        }
        res.render('empleadoedit', { user: results[0] });
    });
};

exports.update = (req, res) => {
    const { idemp, ape, nom, dir, tel, idcar } = req.body;
    conexion.query('UPDATE empleado SET ? WHERE IdEmpleado = ?',
        [{ Apellidos: ape, Nombres: nom, Direccion: dir, Telefono: tel, IdCargo: idcar }, idemp],
        (error) => {
            if (error) {
                console.error(error);
                return res.send(MSG_ERROR_DB);
            }
            res.redirect('/empleado');
        }
    );
};

exports.delete = (req, res) => {
    const { idemp } = req.params;
    conexion.query('DELETE FROM empleado WHERE IdEmpleado = ?', [idemp], (error) => {
        if (error) {
            console.error(error);
            return res.send(MSG_ERROR_DB);
        }
        res.redirect('/empleado');
    });
};
