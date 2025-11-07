const conexion = require('../database/db');

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT * FROM cargo', (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

exports.getById = (id) => {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT * FROM cargo WHERE IdCargo = ?', [id], (error, results) => {
            if (error) return reject(error);
            resolve(results[0]);
        });
    });
};

exports.create = ({ id, car, suel }) => {
    return new Promise((resolve, reject) => {
        conexion.query(
            'INSERT INTO cargo SET ?',
            { IdCargo: id, Cargo: car, Sueldo: suel },
            (error) => error ? reject(error) : resolve()
        );
    });
};

exports.update = ({ id, car, suel }) => {
    return new Promise((resolve, reject) => {
        conexion.query(
            'UPDATE cargo SET ? WHERE IdCargo = ?',
            [{ Cargo: car, Sueldo: suel }, id],
            (error) => error ? reject(error) : resolve()
        );
    });
};

exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        conexion.query('DELETE FROM cargo WHERE IdCargo = ?', [id], (error) =>
            error ? reject(error) : resolve()
        );
    });
};
