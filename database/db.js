const mysql = require('mysql2');

// ------------------
// Constantes de configuración
// ------------------
const DB_HOST = 'localhost';
const DB_PORT = '3306';
const DB_USER = 'root';
const DB_PASSWORD = '12345';
const DB_NAME = 'empleado';

const TABLE_CARGO = 'cargo';
const TABLE_EMPLEADO = 'empleado';

const MSG_CONNECTION_ERROR = 'Error al conectar a MySQL:';
const MSG_DB_CREATED = 'Base de datos creada o ya existe';
const MSG_DB_SELECTED = 'Base de datos seleccionada';
const MSG_TABLE_CREATED = tabla => `Tabla ${tabla} creada o ya existe`;
const MSG_INSERT_SUCCESS = tabla => `Datos insertados en la tabla ${tabla}`;
const MSG_INSERT_ERROR = tabla => `Error al insertar datos en la tabla ${tabla}:`;

// ------------------
// Conexión a MySQL
// ------------------
const conexion = mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD
});

// ------------------
// Conexión y creación de base de datos y tablas
// ------------------
conexion.connect(err => {
    if (err) {
        console.error(MSG_CONNECTION_ERROR, err);
        return;
    }

    console.log('Conexión exitosa');

    // Crear base de datos
    conexion.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`, err => {
        if (err) return console.error('Error al crear la base de datos:', err);
        console.log(MSG_DB_CREATED);

        // Seleccionar base de datos
        conexion.changeUser({ database: DB_NAME }, err => {
            if (err) return console.error('Error al seleccionar la base de datos:', err);
            console.log(MSG_DB_SELECTED);

            // Crear tabla cargo
            const crearTablaCargo = `
                CREATE TABLE IF NOT EXISTS ${TABLE_CARGO} (
                    IdCargo CHAR(3) NOT NULL,
                    Cargo VARCHAR(30),
                    Sueldo FLOAT,
                    PRIMARY KEY (IdCargo)
                )
            `;
            conexion.query(crearTablaCargo, err => {
                if (err) return console.error(`Error al crear la tabla ${TABLE_CARGO}:`, err);
                console.log(MSG_TABLE_CREATED(TABLE_CARGO));

                // Insertar datos iniciales en cargo
                const insertarCargo = `
                    INSERT INTO ${TABLE_CARGO} (IdCargo, Cargo, Sueldo) VALUES
                    ('001', 'Programador', 1000),
                    ('002', 'Analista', 950),
                    ('003', 'Diseñador', 900)
                    ON DUPLICATE KEY UPDATE Cargo = VALUES(Cargo), Sueldo = VALUES(Sueldo)
                `;
                conexion.query(insertarCargo, err => {
                    if (err) return console.error(MSG_INSERT_ERROR(TABLE_CARGO), err);
                    console.log(MSG_INSERT_SUCCESS(TABLE_CARGO));
                });
            });

            // Crear tabla empleado
            const crearTablaEmpleado = `
                CREATE TABLE IF NOT EXISTS ${TABLE_EMPLEADO} (
                    IdEmpleado CHAR(5) NOT NULL,
                    Apellidos VARCHAR(50),
                    Nombres VARCHAR(50),
                    Direccion VARCHAR(100),
                    Telefono CHAR(9),
                    IdCargo CHAR(3),
                    PRIMARY KEY (IdEmpleado),
                    FOREIGN KEY (IdCargo) REFERENCES ${TABLE_CARGO}(IdCargo)
                )
            `;
            conexion.query(crearTablaEmpleado, err => {
                if (err) return console.error(`Error al crear la tabla ${TABLE_EMPLEADO}:`, err);
                console.log(MSG_TABLE_CREATED(TABLE_EMPLEADO));

                // Insertar datos iniciales en empleado
                const insertarEmpleado = `
                    INSERT INTO ${TABLE_EMPLEADO} 
                    (IdEmpleado, Apellidos, Nombres, Direccion, Telefono, IdCargo) VALUES
                    ('00001', 'CONTRERAS', 'JHANNS', 'LIMA 14', '909090123', '001')
                    ON DUPLICATE KEY UPDATE Apellidos = VALUES(Apellidos), Nombres = VALUES(Nombres)
                `;
                conexion.query(insertarEmpleado, err => {
                    if (err) return console.error(MSG_INSERT_ERROR(TABLE_EMPLEADO), err);
                    console.log(MSG_INSERT_SUCCESS(TABLE_EMPLEADO));
                });
            });
        });
    });
});

// ------------------
// Exportar la conexión
// ------------------
module.exports = conexion;
