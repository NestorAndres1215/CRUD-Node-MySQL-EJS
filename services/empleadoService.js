const conexion = require('../database/db');

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT * FROM empleado', (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

exports.getById = (idemp) => {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT * FROM empleado WHERE IdEmpleado = ?', [idemp], (error, results) => {
            if (error) return reject(error);
            resolve(results[0]);
        });
    });
};

exports.create = ({ idemp, ape, nom, dir, tel, idcar }) => {
    return new Promise((resolve, reject) => {
        conexion.query(
            'INSERT INTO empleado SET ?',
            { IdEmpleado: idemp, Apellidos: ape, Nombres: nom, Direccion: dir, Telefono: tel, IdCargo: idcar },
            (error) => error ? reject(error) : resolve()
        );
    });
};

exports.update = ({ idemp, ape, nom, dir, tel, idcar }) => {
    return new Promise((resolve, reject) => {
        conexion.query(
            'UPDATE empleado SET ? WHERE IdEmpleado = ?',
            [{ Apellidos: ape, Nombres: nom, Direccion: dir, Telefono: tel, IdCargo: idcar }, idemp],
            (error) => error ? reject(error) : resolve()
        );
    });
};

exports.delete = (idemp) => {
    return new Promise((resolve, reject) => {
        conexion.query('DELETE FROM empleado WHERE IdEmpleado = ?', [idemp], (error) =>
            error ? reject(error) : resolve()
        );
    });
};
