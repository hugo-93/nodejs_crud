const express = require('express');
const router = express.Router();
const Ente = require('../models/ente');

router.get('/:id/edit', async (req, res) => {
    console.log('/entes/:id - Ver un ente específico.');
    const id = req.params.id;
    // console.log(id);

    try {
        const enteBD = await Ente.findOne({_id: id});
        // console.log(enteBD);
        // console.log('¡Ente leido de la BD!');
        if (!enteBD) {
            req.session.respuesta = {
                estatus: false,
                msg: 'No se encontró el ente indicado.',
                alerta: true
            };
            res.redirect('/entes');
        }

        let respuesta = req.session.respuesta;
        console.log(req.session);
        delete req.session.respuesta;
        res.render('entes/ente', {
            respuesta: respuesta,
            ente: enteBD,
            error: false
        });
    }
    catch(error) {
        console.log(error);
        req.session.respuesta = {
            estatus: false,
            msg: 'Ocurrió un error.',
            alerta: true
        };
        res.redirect('/entes');
    }
});

router.get('/', async (req, res) => {
    console.log('/entes - Ver listado de entes.');
    try {
        const arrayEntesBD = await Ente.find();
        // console.log(arrayEntesBD);
        // console.log('¡Entes obtenidos de la BD!');
        let respuesta = req.session.respuesta;
        console.log(req.session);
        delete req.session.respuesta;
        res.render('entes/entes', {
            respuesta: respuesta,
            entes: arrayEntesBD
            /*[
                {
                    id: 74,
                    siglas: "BP",
                    descripcion: "Bosque de la Primavera"
                },
                {
                    id: 140,
                    siglas: "PEEJ",
                    descripcion: "Poder Ejecutivo del Estado de Jalisco"
                },
                {
                    id: 138,
                    siglas: "ADICD",
                    descripcion: "Agencia para el Desarrollo de Industrias Creativas y Digitales del Estado de Jalisco"
                },
            ]*/
        });
    }
    catch(error) {
        console.log(error);
        req.session.respuesta = {
            estatus: false,
            msg: 'Ocurrió un error.',
            alerta: true
        };
        res.redirect('/entes');
    }
});

// router.delete('/:id', async (req, res) => {
router.get('/:id/delete', async (req, res) => {
    console.log('/enteEliminar/:id - Eliminar un ente específico.');
    const id = req.params.id;
    // console.log(id);

    try {
        const enteBD = await Ente.findByIdAndDelete({_id: id});
        // console.log(enteBD);
        // console.log('¡Ente eliminado de la BD!');

        // if (!enteBD) {
        //     res.json({
        //         estado: false,
        //         mensaje: 'No se pudo eliminar el ente.'
        //     });
        // }
        // else {
        //     res.json({
        //         estado: true,
        //         mensaje: '¡Ente eliminado!'
        //     });
        // }

        req.session.respuesta = {
            estatus: true,
            msg: 'Ente "' + enteBD.descripcion + '" eliminado correctamente.',
            alerta: true
        };
        res.redirect('/entes');
    }
    catch(error) {
        console.log(error);
        req.session.respuesta = {
            estatus: false,
            msg: 'No se pudo eliminar el ente.',
            alerta: true
        };
        res.redirect('/entes');
    }
});

router.get('/create', (req, res) => {
    console.log('/create - Formulario para crear un ente.');
    res.render('entes/ente_create');
});

router.post('/', async (req, res) => {
    console.log('/entes - Crear un ente.');
    const body = req.body;
    // console.log(body);

    try {
        // await Ente.create(body);
        const enteBD = new Ente(body);
        await enteBD.save();
        // console.log(enteBD);
        // console.log('¡Ente guardado en la BD!');
        req.session.respuesta = {
            estatus: true,
            msg: 'Ente creado correctamente.',
            alerta: true
        };
        res.redirect('/entes');
    }
    catch(error) {
        console.log(error);
        req.session.respuesta = {
            estatus: false,
            msg: 'No se pudo crear el ente.',
            alerta: true
        };
        res.redirect('/entes');
    }
});

// router.put('/:id', async (req, res) => {
router.post('/:id', async (req, res) => {
    console.log('/entes/:id - Editar un ente específico.');
    const id = req.params.id;
    const body = req.body;
    // console.log(id, body);

    try {
        const enteBD = await Ente.findByIdAndUpdate(
            id,
            body,
            {useFindAndModify: false}
        );
        // console.log(enteBD);
        // console.log('¡Ente editado en la BD!');
        req.session.respuesta = {
            estatus: true,
            msg: 'Ente editado correctamente.',
            alerta: true
        };
        res.redirect('/entes/' + id + '/edit');
    }
    catch (error) {
        console.log(error);
        req.session.respuesta = {
            estatus: false,
            msg: 'No se pudo editar el ente.',
            alerta: true
        };
        res.redirect('/entes/' + id + '/edit');
    }
});

module.exports = router;