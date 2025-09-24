const mysql = require('mysql2');

// Crear conexión con MySQL
const conexion = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '12345'
});

// Conectar a MySQL
conexion.connect((error) => {
    if (error) {
        console.log('Error al conectar: ' + error);
        return;
    }
    console.log('Conexión exitosa');

    // Crear base de datos si no existe
    const crearBaseDeDatos = `CREATE DATABASE IF NOT EXISTS empleado`;
    conexion.query(crearBaseDeDatos, (err, result) => {
        if (err) {
            console.log('Error al crear la base de datos: ' + err);
        } else {
            console.log('Base de datos creada o ya existe');
            // Seleccionar la base de datos
            conexion.changeUser({ database: 'empleado' }, (err) => {
                if (err) {
                    console.log('Error al seleccionar la base de datos: ' + err);
                    return;
                }
                console.log('Base de datos seleccionada');

                // Crear tabla 'cargo' si no existe
                const crearTablaCargo = `
                    CREATE TABLE IF NOT EXISTS cargo (
                        IdCargo CHAR(3) NOT NULL,
                        Cargo VARCHAR(30),
                        Sueldo FLOAT,
                        PRIMARY KEY (IdCargo)
                    )
                `;
                conexion.query(crearTablaCargo, (err, result) => {
                    if (err) {
                        console.log('Error al crear la tabla cargo: ' + err);
                    } else {
                        console.log('Tabla cargo creada o ya existe');
                    }
                });

                // Crear tabla 'empleado' si no existe
                const crearTablaEmpleado = `
                    CREATE TABLE IF NOT EXISTS empleado (
                        IdEmpleado CHAR(5) NOT NULL,
                        Apellidos VARCHAR(50),
                        Nombres VARCHAR(50),
                        Direccion VARCHAR(100),
                        Telefono CHAR(9),
                        IdCargo CHAR(3),
                        PRIMARY KEY (IdEmpleado),
                        FOREIGN KEY (IdCargo) REFERENCES cargo(IdCargo)
                    )
                `;
                conexion.query(crearTablaEmpleado, (err, result) => {
                    if (err) {
                        console.log('Error al crear la tabla empleado: ' + err);
                    } else {
                        console.log('Tabla empleado creada o ya existe');

                        // Insertar datos en la tabla cargo
                        const insertarCargo = `
                            INSERT INTO cargo (IdCargo, Cargo, Sueldo) VALUES
                            ('001', 'Programador', 1000),
                            ('002', 'Analista', 950),
                            ('003', 'Diseñador', 900)
                        `;
                        conexion.query(insertarCargo, (err, result) => {
                            if (err) {
                                console.log('Error al insertar datos en la tabla cargo: ' + err);
                            } else {
                                console.log('Datos insertados en la tabla cargo');
                            }
                        });

                        // Insertar datos en la tabla empleado
                        const insertarEmpleado = `
                            INSERT INTO empleado (IdEmpleado, Apellidos, Nombres, Direccion, Telefono, IdCargo) VALUES
                            ('00001', 'CONTRERAS', 'JHANNS', 'LIMA 14', '909090123', '001')
                        `;
                        conexion.query(insertarEmpleado, (err, result) => {
                            if (err) {
                                console.log('Error al insertar datos en la tabla empleado: ' + err);
                            } else {
                                console.log('Datos insertados en la tabla empleado');
                            }
                        });
                    }
                });
            });
        }
    });
});

// Exportar la conexión
module.exports = conexion;
