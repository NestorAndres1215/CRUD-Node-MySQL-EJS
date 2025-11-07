const cargoService = require('../services/cargoService');
const MSG_ERROR_DB = require('../config/constants');

exports.list = async (req, res) => {
    try {
        const results = await cargoService.getAll();
        res.render('cargo', { results });
    } catch (error) {
        console.error(error);
        res.send(MSG_ERROR_DB);
    }
};

exports.viewCreate = (req, res) => res.render('cargonew');

exports.create = async (req, res) => {
    try {
        const { id, car, suel } = req.body;

        if (!id || !car || !suel)
            return res.status(400).send({ error: 'Todos los campos son obligatorios' });

        if (!/^\d+(\.\d+)?$/.test(suel))
            return res.status(400).send({ error: 'Sueldo debe ser un número válido' });

        await cargoService.create({ id, car, suel });
        res.redirect('/cargo');
    } catch (error) {
        console.error(error);
        res.send(MSG_ERROR_DB);
    }
};

exports.viewEdit = async (req, res) => {
    try {
        const user = await cargoService.getById(req.params.id);
        res.render('cargoedit', { user });
    } catch (error) {
        console.error(error);
        res.send(MSG_ERROR_DB);
    }
};

exports.update = async (req, res) => {
    try {
        const { id, car, suel } = req.body;

        if (!id || !car || !suel)
            return res.status(400).send({ error: 'Todos los campos son obligatorios' });

        if (!/^\d+(\.\d+)?$/.test(suel))
            return res.status(400).send({ error: 'Sueldo debe ser un número válido' });

        await cargoService.update({ id, car, suel });
        res.redirect('/cargo');
    } catch (error) {
        console.error(error);
        res.send(MSG_ERROR_DB);
    }
};

exports.delete = async (req, res) => {
    try {
        await cargoService.delete(req.params.id);
        res.redirect('/cargo');
    } catch (error) {
        console.error(error);
        res.send(MSG_ERROR_DB);
    }
};
