const empleadoService = require('../services/empleadoService');
const MSG_ERROR_DB = require('../config/constants');

exports.listarEmpleados = async (req, res) => {
    try {
        const results = await empleadoService.getAll();
        res.render('empleado', { results });
    } catch (error) {
        console.error(error);
        res.send(MSG_ERROR_DB);
    }
};

exports.viewCreate = (req, res) => res.render('empleadonew');

exports.create = async (req, res) => {
    try {
        const { idemp, ape, nom, dir, tel, idcar } = req.body;

        // Validaciones
        if (!idemp || !ape || !nom || !dir || !tel || !idcar)
            return res.status(400).send({ error: "Todos los campos son obligatorios" });

        if (ape.trim().length < 2 || nom.trim().length < 2)
            return res.status(400).send({ error: "Nombre y apellido deben tener mínimo 2 letras" });

        if (!/^\d{9}$/.test(tel))
            return res.status(400).send({ error: "El teléfono debe tener 9 dígitos" });

        await empleadoService.create({ idemp, ape, nom, dir, tel, idcar });
        res.redirect('/empleado');

    } catch (error) {
        console.error(error);
        res.send(MSG_ERROR_DB);
    }
};

exports.viewEdit = async (req, res) => {
    try {
        const user = await empleadoService.getById(req.params.idemp);
        res.render('empleadoedit', { user });
    } catch (error) {
        console.error(error);
        res.send(MSG_ERROR_DB);
    }
};

exports.update = async (req, res) => {
    try {
        await empleadoService.update(req.body);
        res.redirect('/empleado');
    } catch (error) {
        console.error(error);
        res.send(MSG_ERROR_DB);
    }
};

exports.delete = async (req, res) => {
    try {
        await empleadoService.delete(req.params.idemp);
        res.redirect('/empleado');
    } catch (error) {
        console.error(error);
        res.send(MSG_ERROR_DB);
    }
};
